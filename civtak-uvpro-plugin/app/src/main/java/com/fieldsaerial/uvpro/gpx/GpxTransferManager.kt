package com.fieldsaerial.uvpro.gpx

import android.content.ContentResolver
import android.net.Uri
import com.fieldsaerial.uvpro.protocol.UvProPacket
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicInteger
import java.util.zip.GZIPInputStream
import java.util.zip.GZIPOutputStream
import kotlin.math.min
import kotlin.random.Random

class GpxTransferManager(
    private val contentResolver: ContentResolver,
    private val scope: CoroutineScope,
    private val sendPacket: (UvProPacket) -> Unit,
    private val onReceivedGpx: (String, ByteArray) -> Unit,
    private val onStatus: (String) -> Unit
) {
    private val msgIdCounter = AtomicInteger(1)
    private val sessions = ConcurrentHashMap<Int, ReceiveSession>()

    private data class ReceiveSession(
        val name: String,
        val totalChunks: Int,
        val chunks: Array<ByteArray?>
    )

    fun sendGpx(uri: Uri) {
        scope.launch(Dispatchers.IO) {
            val bytes = contentResolver.openInputStream(uri)?.use { it.readBytes() } ?: return@launch
            val gzipBytes = gzip(bytes)
            val msgId = nextMsgId()
            val chunkSize = 180
            val totalChunks = (gzipBytes.size + chunkSize - 1) / chunkSize
            val name = (uri.lastPathSegment ?: "track.gpx").take(64)

            val offerBody = ByteBuffer.allocate(2 + 2 + name.toByteArray().size)
                .order(ByteOrder.BIG_ENDIAN)
                .putShort(totalChunks.toShort())
                .putShort(chunkSize.toShort())
                .put(name.toByteArray())
                .array()
            sendPacket(UvProPacket(UvProPacket.TYPE_FILE_OFFER, msgId, offerBody))
            onStatus("FILE_OFFER sent for $name ($totalChunks chunks)")

            val maxRetries = 20
            val windowSize = 4
            var base = 0
            var retries = 0
            val acked = BooleanArray(totalChunks)

            while (base < totalChunks && retries < maxRetries) {
                val upper = min(base + windowSize, totalChunks)
                for (i in base until upper) {
                    if (acked[i]) continue
                    val offset = i * chunkSize
                    val end = min(offset + chunkSize, gzipBytes.size)
                    val payload = gzipBytes.copyOfRange(offset, end)
                    val body = ByteBuffer.allocate(2 + payload.size).order(ByteOrder.BIG_ENDIAN)
                        .putShort(i.toShort())
                        .put(payload)
                        .array()
                    sendPacket(UvProPacket(UvProPacket.TYPE_FILE_DATA, msgId, body))
                }

                delay(1200 + Random.nextLong(0, 250))
                retries++
                while (base < totalChunks && acked[base]) base++
            }

            sendPacket(UvProPacket(UvProPacket.TYPE_FILE_DONE, msgId, ByteArray(0)))
            onStatus("GPX transfer finished for $name")
        }
    }

    fun handlePacket(packet: UvProPacket) {
        when (packet.type) {
            UvProPacket.TYPE_FILE_OFFER -> handleOffer(packet)
            UvProPacket.TYPE_FILE_DATA -> handleData(packet)
            UvProPacket.TYPE_FILE_DONE -> handleDone(packet)
            UvProPacket.TYPE_FILE_SACK -> handleSack(packet)
        }
    }

    private fun handleOffer(packet: UvProPacket) {
        val buf = ByteBuffer.wrap(packet.body).order(ByteOrder.BIG_ENDIAN)
        val totalChunks = buf.short.toInt() and 0xFFFF
        val _chunkSize = buf.short.toInt() and 0xFFFF
        val nameBytes = ByteArray(buf.remaining())
        buf.get(nameBytes)
        val name = nameBytes.toString(Charsets.UTF_8)

        sessions[packet.msgId] = ReceiveSession(name, totalChunks, arrayOfNulls(totalChunks))
        sendPacket(UvProPacket(UvProPacket.TYPE_FILE_ACCEPT, packet.msgId, ByteArray(0)))
        onStatus("Accepted incoming GPX: $name")
    }

    private fun handleData(packet: UvProPacket) {
        val session = sessions[packet.msgId] ?: return
        val buf = ByteBuffer.wrap(packet.body).order(ByteOrder.BIG_ENDIAN)
        val seq = buf.short.toInt() and 0xFFFF
        if (seq >= session.totalChunks) return
        val chunk = ByteArray(buf.remaining())
        buf.get(chunk)
        session.chunks[seq] = chunk

        val windowBase = (seq / 32) * 32
        var bitmap = 0
        for (i in 0 until 32) {
            val idx = windowBase + i
            if (idx >= session.totalChunks) break
            if (session.chunks[idx] != null) bitmap = bitmap or (1 shl i)
        }
        val sackBody = ByteBuffer.allocate(2 + 4).order(ByteOrder.BIG_ENDIAN)
            .putShort(windowBase.toShort())
            .putInt(bitmap)
            .array()
        sendPacket(UvProPacket(UvProPacket.TYPE_FILE_SACK, packet.msgId, sackBody))
    }

    private fun handleDone(packet: UvProPacket) {
        val session = sessions.remove(packet.msgId) ?: return
        if (session.chunks.any { it == null }) {
            onStatus("Incomplete GPX ${session.name}; waiting for retry")
            return
        }
        val gz = ByteArrayOutputStream().use { out ->
            session.chunks.forEach { out.write(it) }
            out.toByteArray()
        }
        val gpx = ungzip(gz)
        onReceivedGpx(session.name, gpx)
        onStatus("Received and reassembled GPX: ${session.name}")
    }

    private fun handleSack(packet: UvProPacket) {
        // Sender-side selective ACK processing hook.
        // For production, maintain transfer session map and mark acked bits by msgId.
        onStatus("SACK received for msgId=${packet.msgId}")
    }

    private fun nextMsgId(): Int = msgIdCounter.getAndUpdate { (it + 1) and 0xFFFF }

    private fun gzip(bytes: ByteArray): ByteArray = ByteArrayOutputStream().use { out ->
        GZIPOutputStream(out).use { it.write(bytes) }
        out.toByteArray()
    }

    private fun ungzip(bytes: ByteArray): ByteArray =
        GZIPInputStream(ByteArrayInputStream(bytes)).use { it.readBytes() }
}
