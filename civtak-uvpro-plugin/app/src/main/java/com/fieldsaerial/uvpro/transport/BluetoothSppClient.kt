package com.fieldsaerial.uvpro.transport

import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothSocket
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.InputStream
import java.io.OutputStream
import java.util.UUID

class BluetoothSppClient(
    private val bluetoothAdapter: BluetoothAdapter
) {
    companion object {
        private val SPP_UUID: UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB")
    }

    data class Connection(
        val socket: BluetoothSocket,
        val input: InputStream,
        val output: OutputStream,
        val remoteDevice: BluetoothDevice
    )

    @SuppressLint("MissingPermission")
    suspend fun connect(deviceAddress: String): Connection = withContext(Dispatchers.IO) {
        val device = bluetoothAdapter.getRemoteDevice(deviceAddress)
        bluetoothAdapter.cancelDiscovery()
        val socket = device.createRfcommSocketToServiceRecord(SPP_UUID)
        socket.connect()
        Connection(
            socket = socket,
            input = socket.inputStream,
            output = socket.outputStream,
            remoteDevice = device
        )
    }

    fun disconnect(connection: Connection?) {
        runCatching { connection?.input?.close() }
        runCatching { connection?.output?.close() }
        runCatching { connection?.socket?.close() }
    }
}
