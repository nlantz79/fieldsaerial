package com.fieldsaerial.uvpro.protocol

class KissCodec {
    companion object {
        const val FEND: Byte = 0xC0.toByte()
        const val FESC: Byte = 0xDB.toByte()
        const val TFEND: Byte = 0xDC.toByte()
        const val TFESC: Byte = 0xDD.toByte()
    }

    fun encode(payload: ByteArray, port: Byte = 0x00): ByteArray {
        val out = ArrayList<Byte>(payload.size + 4)
        out += FEND
        out += port
        payload.forEach { b ->
            when (b) {
                FEND -> {
                    out += FESC
                    out += TFEND
                }

                FESC -> {
                    out += FESC
                    out += TFESC
                }

                else -> out += b
            }
        }
        out += FEND
        return out.toByteArray()
    }

    fun decode(streamBytes: ByteArray): List<ByteArray> {
        val frames = mutableListOf<ByteArray>()
        var collecting = false
        var escaped = false
        val buf = ArrayList<Byte>()

        streamBytes.forEach { b ->
            when {
                b == FEND -> {
                    if (collecting && buf.isNotEmpty()) {
                        val raw = buf.toByteArray()
                        if (raw.size >= 2 && raw[0] == 0x00.toByte()) {
                            frames += raw.copyOfRange(1, raw.size)
                        }
                    }
                    buf.clear()
                    collecting = true
                    escaped = false
                }

                !collecting -> Unit

                escaped -> {
                    buf += when (b) {
                        TFEND -> FEND
                        TFESC -> FESC
                        else -> b
                    }
                    escaped = false
                }

                b == FESC -> escaped = true
                else -> buf += b
            }
        }
        return frames
    }
}
