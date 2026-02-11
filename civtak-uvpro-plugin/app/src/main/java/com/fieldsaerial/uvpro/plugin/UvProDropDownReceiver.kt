package com.fieldsaerial.uvpro.plugin

import android.Manifest
import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.content.Context
import android.content.Intent
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.widget.ArrayAdapter
import androidx.core.content.ContextCompat
import com.atakmap.android.dropdown.DropDownReceiver
import com.atakmap.android.maps.MapView
import com.fieldsaerial.uvpro.databinding.ViewUvproPluginBinding
import com.fieldsaerial.uvpro.service.UvProActions
import com.fieldsaerial.uvpro.ui.PermissionHelper

class UvProDropDownReceiver(mapView: MapView) : DropDownReceiver(mapView), View.OnClickListener {

    companion object {
        const val ACTION_SHOW_PANEL = "com.fieldsaerial.uvpro.SHOW_PANEL"
        const val ACTION_STATUS = UvProActions.ACTION_STATUS
    }

    private val context: Context = mapView.context
    private val binding = ViewUvproPluginBinding.inflate(LayoutInflater.from(context))
    private val btAdapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()

    private var selectedDeviceAddress: String? = null

    init {
        binding.connectBtn.setOnClickListener(this)
        binding.disconnectBtn.setOnClickListener(this)
        binding.sendTestCotBtn.setOnClickListener(this)
        binding.sendPositionBtn.setOnClickListener(this)
        binding.pickGpxBtn.setOnClickListener(this)

        refreshBondedDevices()
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        when (intent?.action) {
            ACTION_SHOW_PANEL -> showDropDown(
                binding.root,
                HALF_WIDTH,
                FULL_HEIGHT,
                FULL_WIDTH,
                HALF_HEIGHT,
                false,
                this
            )

            ACTION_STATUS -> binding.statusText.text = intent.getStringExtra(UvProActions.EXTRA_STATUS_TEXT)
        }
    }

    @SuppressLint("MissingPermission")
    private fun refreshBondedDevices() {
        val devices = btAdapter?.bondedDevices?.toList().orEmpty()
        val labels = devices.map { "${it.name ?: "Unknown"} (${it.address})" }
        val adapter = ArrayAdapter(context, android.R.layout.simple_spinner_dropdown_item, labels)
        binding.deviceSpinner.adapter = adapter
        binding.deviceSpinner.setOnItemSelectedListener { _, _, position, _ ->
            selectedDeviceAddress = devices.getOrNull(position)?.address
        }
        selectedDeviceAddress = devices.firstOrNull()?.address
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            binding.connectBtn.id -> startServiceAction(UvProActions.ACTION_CONNECT) {
                putExtra(UvProActions.EXTRA_DEVICE_ADDRESS, selectedDeviceAddress)
            }

            binding.disconnectBtn.id -> startServiceAction(UvProActions.ACTION_DISCONNECT)
            binding.sendTestCotBtn.id -> startServiceAction(UvProActions.ACTION_SEND_TEST_COT)
            binding.sendPositionBtn.id -> startServiceAction(UvProActions.ACTION_SEND_POSITION)
            binding.pickGpxBtn.id -> launchGpxPicker()
        }
    }

    private fun launchGpxPicker() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S &&
            !PermissionHelper.hasPermission(context, Manifest.permission.BLUETOOTH_CONNECT)
        ) {
            binding.statusText.text = "Missing BLUETOOTH_CONNECT permission"
            return
        }
        val intent = Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "application/gpx+xml"
        }
        context.startActivity(intent)
        binding.statusText.text = "Select GPX and then share URI through plugin intent hook"
    }

    private fun startServiceAction(action: String, extras: Intent.() -> Unit = {}) {
        val intent = Intent(context, com.fieldsaerial.uvpro.service.BluetoothKissService::class.java).apply {
            this.action = action
            extras()
        }
        ContextCompat.startForegroundService(context, intent)
    }

    override fun disposeImpl() = Unit
}

private fun <T> android.widget.Spinner.setOnItemSelectedListener(listener: (android.widget.AdapterView<*>, View?, Int, Long) -> Unit) {
    onItemSelectedListener = object : android.widget.AdapterView.OnItemSelectedListener {
        override fun onItemSelected(parent: android.widget.AdapterView<*>, view: View?, position: Int, id: Long) {
            listener(parent, view, position, id)
        }

        override fun onNothingSelected(parent: android.widget.AdapterView<*>) = Unit
    }
}
