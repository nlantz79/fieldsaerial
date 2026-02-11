# CivTAK 5.6 UV-PRO Bluetooth KISS Plugin

Kotlin CivTAK plugin project scaffold that bridges TAK CoT + GPX over a BTECH UV-PRO / VGC N76 Bluetooth Classic KISS TNC link.

## Features

- Bluetooth Classic RFCOMM SPP using UUID `00001101-0000-1000-8000-00805F9B34FB`
- Foreground service with reconnect loop + exponential backoff
- KISS framing/escaping (`FEND/FESC/TFEND/TFESC`)
- Custom binary packet protocol (`UP` magic, version, type, msgId, CRC16-CCITT)
- CoT XML send/receive bridge
- GPX transfer workflow (gzip + chunking + SACK scaffolding)
- CivTAK panel (`DropDownReceiver`) for connect/disconnect/test CoT/send GPX

## Build notes

1. Install CivTAK/ATAK 5.6 SDK and publish plugin artifacts into local maven if required.
2. Update `app/build.gradle.kts` dependency coordinates if your SDK uses a different group/artifact.
3. Build with Android Studio Giraffe+ / AGP 8.5 or via `./gradlew assembleDebug`.

## Key package layout

- `plugin/` CivTAK map component + dropdown UI
- `service/` foreground Bluetooth link service
- `transport/` SPP connection and KISS stream manager
- `protocol/` KISS codec + packet + CRC16
- `cot/` inbound/outbound CoT integration
- `gpx/` GPX send/receive transfer logic
