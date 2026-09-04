package com.phonegiftapp;

import android.os.Build;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ShutdownModule extends ReactContextBaseJavaModule {
  public ShutdownModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "ShutdownModule";
  }

  @ReactMethod
  public void shutdownDevice() {
    try {
      // Execute system shutdown command
      Runtime.getRuntime().exec("su -c reboot -p");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @ReactMethod
  public void powerOff() {
    try {
      Runtime.getRuntime().exec(new String[]{"su", "-c", "reboot -p"});
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
