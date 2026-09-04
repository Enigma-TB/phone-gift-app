# Phone Gift App - Setup Instructions

## Overview
This app allows you to send GIFs with a greeting message and control phone shutdown/restart/lock functions.

## Installation & Setup

### 1. Prerequisites
- Node.js and npm installed
- Android SDK installed
- React Native CLI installed
- Android Studio (optional but recommended)

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Link Native Modules
```bash
react-native link
```

### 4. Build for Android
```bash
react-native run-android
```

## Features

### 🎮 Device Control
The app provides full control over device functions:

1. **Auto-Shutdown**: Device automatically shuts down 3 seconds after the greeting is displayed
2. **Manual Controls**: Toggle "Show Controls" to access:
   - ⏻️ **Shutdown Now** - Immediately shutdown the device
   - 🔄 **Restart** - Restart the device
   - 🔐 **Lock Screen** - Lock the device screen

### 📱 Permissions Required

The following Android permissions are required for full functionality:

```xml
<!-- In AndroidManifest.xml -->
<uses-permission android:name="android.permission.SHUTDOWN" />
<uses-permission android:name="android.permission.DEVICE_POWER" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.BIND_DEVICE_ADMIN" />
```

### 🔐 Device Admin Setup

For the **Lock Screen** feature to work, you must:

1. Open the app
2. Go to **Settings > Security > Device Admin Apps**
3. Enable "Phone Gift App"

## Usage

### Sending a GIF
1. Tap "📁 Select GIF" to choose a GIF from your device
2. Tap "🚀 Send GIF" to share
3. The recipient will see a greeting and the device will auto-shutdown after 3 seconds

### Manual Control Panel
1. Tap "🎮 Show Controls" to reveal the control panel
2. Choose from:
   - Shutdown Now
   - Restart
   - Lock Screen
3. Confirm your action in the popup dialog

## Native Module: PhoneControlModule

### Available Methods

#### shutdownDevice()
Immediately shuts down the device.
```javascript
PhoneControlModule.shutdownDevice()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

#### restartDevice()
Immediately restarts the device.
```javascript
PhoneControlModule.restartDevice()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

#### lockDevice()
Locks the device screen (requires Device Admin enabled).
```javascript
PhoneControlModule.lockDevice()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

#### turnOffScreen()
Turns off the screen without full shutdown.
```javascript
PhoneControlModule.turnOffScreen()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

#### scheduleShutdown(delaySeconds)
Schedules a shutdown after a specified delay (in seconds).
```javascript
PhoneControlModule.scheduleShutdown(10)
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

#### getDeviceStatus()
Gets current device status.
```javascript
PhoneControlModule.getDeviceStatus()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

## Troubleshooting

### "Shutdown permission denied" error
- This requires root or system-level permissions on rooted devices
- On standard devices, the app needs to be installed as a system app

### "Device admin not active" error
- Go to Settings > Security > Device Admin Apps
- Enable "Phone Gift App"

### Native module not found
- Run `react-native link` again
- Clean and rebuild: `cd android && ./gradlew clean && cd ..`
- Rebuild the app: `react-native run-android`

## Security Considerations

⚠️ **WARNING**: This app can control critical device functions. Only deploy on devices you own or have explicit permission to control.

- Device shutdown cannot be undone without physical interaction
- Lock screen requires Device Admin permissions
- Use confirmation dialogs before executing critical operations

## File Structure

```
phone-gift-app/
├── src/
│   ├── GreetingScreen.js          # Main greeting & control UI
│   └── [other components]
├── android/
│   └── app/src/main/
│       ├── java/com/phonegiftapp/
│       │   ├── PhoneControlModule.java       # Native module
│       │   ├── PhoneControlPackage.java      # React package
│       │   └── DeviceAdminReceiver.java      # Device admin
│       ├── res/xml/
│       │   └── device_admin.xml              # Admin policies
│       └── AndroidManifest.xml               # Manifest with permissions
├── App.js                          # Main app entry
├── package.json                    # Dependencies
└── SETUP_INSTRUCTIONS.md          # This file
```

## Support

For issues or questions, check the repository's issues section or documentation.
