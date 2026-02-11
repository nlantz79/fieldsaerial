package com.fieldsaerial.uvpro.transport

import android.bluetooth.BluetoothAdapter
import android.util.Log
import com.fieldsaerial.uvpro.protocol.KissCodec
import com.fieldsaerial.uvpro.protocol.UvProPacket
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import java.util.concurrent.atomic.AtomicBoolean
import kotlin.math.min
import kotlin.random.Random

class KissLinkManager(
    private val adapter: BluetoothAdapter,
    private val onPacket: (UvProPacket) -> Unit,
    private val onStatus: (String) -> Unit
) {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val sppClient = BluetoothSppClient(adapter)
    private val kissCodec = KissCodec()
    private val txQueue = Channel<ByteArray>(capacity = Channel.UNLIMITED)
    private val running = AtomicBoolean(false)

    private var worker: Job? = null

    fun start(deviceAddress: String) {
        if (running.getAndSet(true)) return
        worker = scope.launch {
            var backoffMs = 800L
            while (isActive && running.get()) {
                var connection: BluetoothSppClient.Connection? = null
                try {
                    onStatus("Connecting to $deviceAddress")
                    connection = sppClient.connect(deviceAddress)
                    onStatus("Connected: ${connection.remoteDevice.name ?: deviceAddress}")
                    backoffMs = 800L

                    val rxJob = launch {
                        val readBuffer = ByteArray(1024)
                        while (isActive) {
                            val count = connection.input.read(readBuffer)
                            if (count < 0) break
                            val frames = kissCodec.decode(readBuffer.copyOf(count))
                            frames.forEach { frame ->
                                UvProPacket.decode(frame)?.let(onPacket)
                            }
                        }
                    }

                    val txJob = launch {
                        while (isActive) {
                            val bytes = txQueue.receive()
                            connection.output.write(bytes)
                            connection.output.flush()
                        }
                    }

                    rxJob.join()
                    txJob.cancel()
                } catch (ex: Exception) {
                    Log.w("KissLinkManager", "Link error", ex)
                    onStatus("Link error: ${ex.message}")
                } finally {
                    sppClient.disconnect(connection)
                }

                if (running.get()) {
                    val jitter = Random.nextLong(100, 450)
                    val waitMs = backoffMs + jitter
                    onStatus("Reconnecting in ${waitMs}ms")
                    delay(waitMs)
                    backoffMs = min(backoffMs * 2, 15_000L)
                }
            }
            onStatus("Disconnected")
        }
    }

    fun stop() {
        running.set(false)
        worker?.cancel()
        worker = null
    }

    fun sendPacket(packet: UvProPacket) {
        val frame = kissCodec.encode(packet.encode(), 0x00)
        scope.launch {
            txQueue.send(frame)
        }
    }
}
