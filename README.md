# Phone Gift App 🎁

A mobile application that allows you to send GIFs to someone's phone. When they open it, they'll see a greeting message and the phone will automatically shut down.

## Features

✨ **Send GIFs**: Pick any GIF from your device
📤 **Share Functionality**: Send to contacts via standard sharing methods
💬 **Auto Greeting**: Recipient sees "Hi, Enigma there" message
📱 **Auto Shutdown**: Phone automatically powers off after greeting

## Setup

### Prerequisites
- Node.js (v14 or higher)
- React Native CLI
- Android SDK (for Android development)
- Xcode (for iOS development)

### Installation

```bash
# Clone the repository
git clone https://github.com/Enigma-TB/phone-gift-app.git
cd phone-gift-app

# Install dependencies
npm install

# For iOS
cd ios && pod install && cd ..
```

### Running the App

```bash
# Android
npm run android

# iOS
npm run ios
```

## How It Works

1. **Sender Side**:
   - Open the app
   - Click "Select GIF" to choose a GIF file
   - Click "Send GIF" to share it
   - Select how you want to share (via messaging, email, etc.)

2. **Recipient Side**:
   - Receives the GIF and app link
   - Downloads and opens the app
   - Sees the greeting message: "Hi, Enigma there"
   - After 3 seconds, the phone automatically shuts down

## Project Structure

```
├── App.js                 # Main sender interface
├── src/
│   └── GreetingScreen.js  # Greeting and shutdown logic
├── android/               # Android native code
└── ios/                   # iOS native code
```

## Platform-Specific Notes

### Android
- Requires `SHUTDOWN` permission in AndroidManifest.xml
- Device must be rooted for shutdown to work
- Can be used with specific device management apps

### iOS
- iOS restricts app-initiated device shutdown
- Alternative: Display greeting and lock screen

## Security & Legal

⚠️ **Important**: This app demonstrates a concept. Unauthorized device shutdown may violate terms of service. Use responsibly and only with consent.

## License

MIT License - See LICENSE file for details

## Author

Enigma-TB
