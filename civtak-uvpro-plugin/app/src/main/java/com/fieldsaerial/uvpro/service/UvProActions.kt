package com.fieldsaerial.uvpro.service

object UvProActions {
    const val ACTION_CONNECT = "com.fieldsaerial.uvpro.action.CONNECT"
    const val ACTION_DISCONNECT = "com.fieldsaerial.uvpro.action.DISCONNECT"
    const val ACTION_SEND_TEST_COT = "com.fieldsaerial.uvpro.action.SEND_TEST_COT"
    const val ACTION_SEND_POSITION = "com.fieldsaerial.uvpro.action.SEND_POSITION"
    const val ACTION_SEND_GPX_URI = "com.fieldsaerial.uvpro.action.SEND_GPX_URI"

    const val EXTRA_DEVICE_ADDRESS = "extra_device_address"
    const val EXTRA_GPX_URI = "extra_gpx_uri"

    const val ACTION_STATUS = "com.fieldsaerial.uvpro.action.STATUS"
    const val EXTRA_STATUS_TEXT = "extra_status_text"
}
