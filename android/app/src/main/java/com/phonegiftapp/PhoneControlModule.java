package com.phonegiftapp;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.PowerManager;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.Timer;
import java.util.TimerTask;

public class PhoneControlModule extends NativeModule {
    private ReactApplicationContext reactContext;
    private PowerManager powerManager;
    private DevicePolicyManager devicePolicyManager;

    public PhoneControlModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.powerManager = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        this.devicePolicyManager = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
    }

    @Override
    public String getName() {
        return "PhoneControlModule";
    }

    /**
     * Shutdown the device
     */
    @ReactMethod
    public void shutdownDevice(Promise promise) {
        try {
            // Shutdown command - requires system-level permissions
            Runtime.getRuntime().exec("reboot -p");
            promise.resolve("Device shutdown initiated");
        } catch (Exception e) {
            promise.reject("SHUTDOWN_ERROR", e.getMessage());
        }
    }

    /**
     * Restart the device
     */
    @ReactMethod
    public void restartDevice(Promise promise) {
        try {
            Runtime.getRuntime().exec("reboot");
            promise.resolve("Device restart initiated");
        } catch (Exception e) {
            promise.reject("RESTART_ERROR", e.getMessage());
        }
    }

    /**
     * Lock the device screen
     */
    @ReactMethod
    public void lockDevice(Promise promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                ComponentName component = new ComponentName(reactContext, DeviceAdminReceiver.class);
                if (devicePolicyManager.isAdminActive(component)) {
                    devicePolicyManager.lockNow();
                    promise.resolve("Device locked");
                } else {
                    promise.reject("LOCK_ERROR", "Device admin not active");
                }
            } else {
                // Fallback for older devices
                powerManager.goToSleep(System.currentTimeMillis());
                promise.resolve("Device locked");
            }
        } catch (Exception e) {
            promise.reject("LOCK_ERROR", e.getMessage());
        }
    }

    /**
     * Turn off the screen (without full shutdown)
     */
    @ReactMethod
    public void turnOffScreen(Promise promise) {
        try {
            if (powerManager != null) {
                powerManager.goToSleep(System.currentTimeMillis());
                promise.resolve("Screen turned off");
            } else {
                promise.reject("SCREEN_ERROR", "PowerManager not available");
            }
        } catch (Exception e) {
            promise.reject("SCREEN_ERROR", e.getMessage());
        }
    }

    /**
     * Schedule a delayed shutdown
     */
    @ReactMethod
    public void scheduleShutdown(int delaySeconds, Promise promise) {
        try {
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    try {
                        Runtime.getRuntime().exec("reboot -p");
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }, delaySeconds * 1000L);
            
            promise.resolve("Shutdown scheduled for " + delaySeconds + " seconds");
        } catch (Exception e) {
            promise.reject("SCHEDULE_ERROR", e.getMessage());
        }
    }

    /**
     * Get device status
     */
    @ReactMethod
    public void getDeviceStatus(Promise promise) {
        try {
            boolean isScreenOn = powerManager.isInteractive();
            promise.resolve("Screen is " + (isScreenOn ? "on" : "off"));
        } catch (Exception e) {
            promise.reject("STATUS_ERROR", e.getMessage());
        }
    }
}
