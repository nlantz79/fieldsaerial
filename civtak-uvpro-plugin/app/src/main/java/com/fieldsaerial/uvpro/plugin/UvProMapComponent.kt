package com.fieldsaerial.uvpro.plugin

import android.content.Intent
import android.content.IntentFilter
import com.atakmap.android.dropdown.DropDownMapComponent
import com.atakmap.android.ipc.AtakBroadcast
import com.atakmap.android.maps.MapView

class UvProMapComponent : DropDownMapComponent() {
    private var receiver: UvProDropDownReceiver? = null

    override fun onCreate(mapView: MapView?) {
        super.onCreate(mapView)
        val mv = mapView ?: return
        receiver = UvProDropDownReceiver(mv)
        val filter = IntentFilter().apply {
            addAction(UvProDropDownReceiver.ACTION_SHOW_PANEL)
            addAction(UvProDropDownReceiver.ACTION_STATUS)
        }
        AtakBroadcast.getInstance().registerReceiver(receiver, filter)
    }

    override fun onDestroyWidgets(context: android.content.Context?) {
        receiver?.let { AtakBroadcast.getInstance().unregisterReceiver(it) }
        receiver = null
    }

    override fun onStart(context: android.content.Context?, intent: Intent?) = Unit
    override fun onStop(context: android.content.Context?, intent: Intent?) = Unit
}
