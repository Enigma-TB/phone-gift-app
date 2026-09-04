# Phone Gift App - Easy Build Guide 📱

## Quick Start (Easiest Way)

### Step 1: Install Prerequisites
```bash
# Install Node.js from https://nodejs.org/ (v14+)
# Install Android Studio from https://developer.android.com/studio

# After Android Studio installs, open it and install:
# - Android SDK
# - Android SDK Platform
# - Android Virtual Device (emulator)
```

### Step 2: Clone & Install
```bash
# Clone the app
git clone https://github.com/Enigma-TB/phone-gift-app.git
cd phone-gift-app

# Install dependencies
npm install
```

### Step 3: Connect Your Phone (or use Emulator)
**Option A - Real Phone (USB):**
```bash
# Enable Developer Mode on your phone:
# 1. Go to Settings > About Phone
# 2. Tap "Build Number" 7 times
# 3. Go back to Settings > Developer Options > Enable USB Debugging
# 4. Connect phone via USB cable
```

**Option B - Use Emulator:**
```bash
# Open Android Studio > Device Manager > Create Virtual Device
# Start the emulator
```

### Step 4: Build & Run
```bash
npm run android
```

The app will automatically build and launch on your phone/emulator!

---

## What Happens When Someone Clicks the Link

1. ✅ App opens on their phone
2. ✅ Screen turns **OFF** immediately (not permanent)
3. ✅ User can wake phone with power button
4. ✅ No buttons needed - it's automatic!

---

## Troubleshooting

### "No devices found"
- Make sure USB debugging is enabled
- Try: `adb devices` in terminal

### Build fails
```bash
# Clean and rebuild
cd android && ./gradlew clean && cd ..
npm run android
```

### Need help?
Check: https://github.com/Enigma-TB/phone-gift-app/issues

---

**That's it!** Your app is ready to use on any phone. 🎉
