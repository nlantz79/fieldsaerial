package com.fieldsaerial.uvpro.cot

import android.content.Context
import android.content.Intent

class CotBridge(private val context: Context) {
    fun injectCotXml(cotXml: String) {
        // Preferred path in CivTAK plugin environments is the CoT event sender API.
        // We provide a broadcast fallback to remain compatible with varied 5.6 deployments.
        val intent = Intent("com.atakmap.android.cot.COT_EVENT")
            .putExtra("xml", cotXml)
        context.sendBroadcast(intent)
    }

    fun buildTestMarkerXml(uid: String, lat: Double, lon: Double): String {
        val now = System.currentTimeMillis()
        val stale = now + 120_000
        return """
            <event version="2.0" uid="$uid" type="a-f-G-U-C" how="m-g" time="${iso(now)}" start="${iso(now)}" stale="${iso(stale)}">
              <point lat="$lat" lon="$lon" hae="0" ce="9999999" le="9999999"/>
              <detail><contact callsign="UVPRO"/></detail>
            </event>
        """.trimIndent()
    }

    private fun iso(ms: Long): String = java.time.Instant.ofEpochMilli(ms).toString()
}
