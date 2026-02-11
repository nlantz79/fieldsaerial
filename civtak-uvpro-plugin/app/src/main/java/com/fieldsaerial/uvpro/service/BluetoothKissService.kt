package com.fieldsaerial.uvpro.service

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.bluetooth.BluetoothAdapter
import android.content.Intent
import android.net.Uri
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import com.fieldsaerial.uvpro.R
import com.fieldsaerial.uvpro.cot.CotBridge
import com.fieldsaerial.uvpro.gpx.GpxTransferManager
import com.fieldsaerial.uvpro.protocol.UvProPacket
import com.fieldsaerial.uvpro.transport.KissLinkManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import java.util.concurrent.atomic.AtomicInteger

class BluetoothKissService : Service() {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val btAdapter by lazy { BluetoothAdapter.getDefaultAdapter() }
    private val cotBridge by lazy { CotBridge(this) }
    private val msgId = AtomicInteger(200)

    private lateinit var linkManager: KissLinkManager
    private lateinit var gpxTransfer: GpxTransferManager

    override fun onCreate() {
        super.onCreate()
        createNotifChannel()

        linkManager = KissLinkManager(
            adapter = btAdapter,
            onPacket = ::handleInboundPacket,
            onStatus = ::publishStatus
        )

        gpxTransfer = GpxTransferManager(
            contentResolver = contentResolver,
            scope = scope,
            sendPacket = { linkManager.sendPacket(it) },
            onReceivedGpx = ::importReceivedGpx,
            onStatus = ::publishStatus
        )

        startForeground(42, buildNotification(getString(R.string.notif_text_connecting)))
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            UvProActions.ACTION_CONNECT -> {
                val addr = intent.getStringExtra(UvProActions.EXTRA_DEVICE_ADDRESS)
                if (addr.isNullOrBlank()) {
                    publishStatus("No selected Bluetooth device")
                } else {
                    linkManager.start(addr)
                }
            }

            UvProActions.ACTION_DISCONNECT -> {
                linkManager.stop()
                stopSelf()
            }

            UvProActions.ACTION_SEND_TEST_COT -> sendTestCot()
            UvProActions.ACTION_SEND_POSITION -> sendMyPositionPlaceholder()
            UvProActions.ACTION_SEND_GPX_URI -> {
                intent.getStringExtra(UvProActions.EXTRA_GPX_URI)?.let { uriStr ->
                    gpxTransfer.sendGpx(Uri.parse(uriStr))
                }
            }
        }
        return START_STICKY
    }

    private fun handleInboundPacket(packet: UvProPacket) {
        when (packet.type) {
            UvProPacket.TYPE_COT_XML -> {
                cotBridge.injectCotXml(packet.body.toString(Charsets.UTF_8))
                publishStatus("Received CoT XML (${packet.body.size}B)")
            }

            UvProPacket.TYPE_FILE_OFFER,
            UvProPacket.TYPE_FILE_ACCEPT,
            UvProPacket.TYPE_FILE_DATA,
            UvProPacket.TYPE_FILE_SACK,
            UvProPacket.TYPE_FILE_DONE -> gpxTransfer.handlePacket(packet)
        }
    }

    private fun sendTestCot() {
        val xml = cotBridge.buildTestMarkerXml(
            uid = "uvpro-${System.currentTimeMillis()}",
            lat = 37.4219999,
            lon = -122.0840575
        )
        val packet = UvProPacket(UvProPacket.TYPE_COT_XML, nextMsgId(), xml.toByteArray(Charsets.UTF_8))
        linkManager.sendPacket(packet)
        publishStatus("Sent test CoT marker")
    }

    private fun sendMyPositionPlaceholder() {
        val xml = cotBridge.buildTestMarkerXml(
            uid = "self-${System.currentTimeMillis()}",
            lat = 0.0,
            lon = 0.0
        )
        linkManager.sendPacket(UvProPacket(UvProPacket.TYPE_COT_XML, nextMsgId(), xml.toByteArray()))
        publishStatus("Sent my-position placeholder CoT")
    }

    private fun importReceivedGpx(name: String, gpxBytes: ByteArray) {
        val temp = kotlin.io.path.createTempFile(prefix = "uvpro_", suffix = "_$name").toFile()
        temp.writeBytes(gpxBytes)
        val intent = Intent("com.atakmap.android.importfiles.IMPORT_FILE").apply {
            putExtra("filepath", temp.absolutePath)
            putExtra("showNotifications", true)
        }
        sendBroadcast(intent)
        publishStatus("Imported GPX into CivTAK: $name")
    }

    private fun publishStatus(status: String) {
        sendBroadcast(Intent(UvProActions.ACTION_STATUS).putExtra(UvProActions.EXTRA_STATUS_TEXT, status))
        val notification = buildNotification(status)
        val nm = getSystemService(NotificationManager::class.java)
        nm.notify(42, notification)
    }

    private fun createNotifChannel() {
        val nm = getSystemService(NotificationManager::class.java)
        nm.createNotificationChannel(
            NotificationChannel(
                getString(R.string.notif_channel_id),
                getString(R.string.notif_channel_name),
                NotificationManager.IMPORTANCE_LOW
            )
        )
    }

    private fun buildNotification(status: String): Notification {
        val launchIntent = packageManager.getLaunchIntentForPackage(packageName)
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            launchIntent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        return NotificationCompat.Builder(this, getString(R.string.notif_channel_id))
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(getString(R.string.notif_title))
            .setContentText(status)
            .setOngoing(true)
            .setContentIntent(pendingIntent)
            .build()
    }

    private fun nextMsgId(): Int = msgId.getAndUpdate { ((it + 1) and 0xFFFF).coerceAtLeast(1) }

    override fun onDestroy() {
        linkManager.stop()
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
