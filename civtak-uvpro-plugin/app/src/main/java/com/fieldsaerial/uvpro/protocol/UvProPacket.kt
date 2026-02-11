package com.fieldsaerial.uvpro.protocol

import java.nio.ByteBuffer
import java.nio.ByteOrder

data class UvProPacket(
    val type: Int,
    val msgId: Int,
    val body: ByteArray
) {
    companion object {
        private const val MAGIC_1: Byte = 0x55
        private const val MAGIC_2: Byte = 0x50
        private const val VER: Byte = 0x01

        const val TYPE_COT_XML = 0x01
        const val TYPE_FILE_OFFER = 0x10
        const val TYPE_FILE_ACCEPT = 0x11
        const val TYPE_FILE_DATA = 0x12
        const val TYPE_FILE_SACK = 0x13
        const val TYPE_FILE_DONE = 0x14

        fun decode(frame: ByteArray): UvProPacket? {
            if (frame.size < 9) return null
            if (frame[0] != MAGIC_1 || frame[1] != MAGIC_2 || frame[2] != VER) return null

            val type = frame[3].toInt() and 0xFF
            val msgId = ((frame[4].toInt() and 0xFF) shl 8) or (frame[5].toInt() and 0xFF)
            val body = frame.copyOfRange(6, frame.size - 2)
            val expectedCrc = ((frame[frame.size - 2].toInt() and 0xFF) shl 8) or
                (frame[frame.size - 1].toInt() and 0xFF)
            val actualCrc = Crc16Ccitt.compute(frame.copyOfRange(0, frame.size - 2))
            if (expectedCrc != actualCrc) return null

            return UvProPacket(type = type, msgId = msgId, body = body)
        }
    }

    fun encode(): ByteArray {
        val buffer = ByteBuffer.allocate(6 + body.size + 2).order(ByteOrder.BIG_ENDIAN)
        buffer.put(MAGIC_1)
        buffer.put(MAGIC_2)
        buffer.put(VER)
        buffer.put(type.toByte())
        buffer.putShort(msgId.toShort())
        buffer.put(body)
        val withoutCrc = buffer.array().copyOfRange(0, 6 + body.size)
        val crc = Crc16Ccitt.compute(withoutCrc)
        buffer.putShort(crc.toShort())
        return buffer.array()
    }
}
