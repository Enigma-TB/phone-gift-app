import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, NativeModules, Alert } from 'react-native';

const { PhoneControlModule } = NativeModules;

const GreetingScreen = ({ onShutdown }) => {
  const [countdown, setCountdown] = useState(3);
  const [manualControl, setManualControl] = useState(false);

  useEffect(() => {
    // Display greeting for 3 seconds, then shutdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          shutdownPhone();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const shutdownPhone = async () => {
    try {
      console.log('Initiating shutdown...');
      
      if (PhoneControlModule && PhoneControlModule.shutdownDevice) {
        await PhoneControlModule.shutdownDevice();
      } else {
        // Fallback: close the app
        console.log('Native module not available, closing app');
        Alert.alert('Shutdown', 'Phone shutdown triggered!');
      }
    } catch (error) {
      console.error('Shutdown error:', error);
      Alert.alert('Error', 'Could not shutdown device: ' + error.message);
    }
  };

  const handleManualShutdown = () => {
    Alert.alert(
      'Confirm Shutdown',
      'Are you sure you want to shutdown the device now?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Shutdown', onPress: shutdownPhone, style: 'destructive' },
      ]
    );
  };

  const handleRestart = () => {
    Alert.alert(
      'Confirm Restart',
      'Are you sure you want to restart the device?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { 
          text: 'Restart', 
          onPress: async () => {
            try {
              if (PhoneControlModule && PhoneControlModule.restartDevice) {
                await PhoneControlModule.restartDevice();
              }
            } catch (error) {
              Alert.alert('Error', 'Could not restart device: ' + error.message);
            }
          }, 
          style: 'destructive' 
        },
      ]
    );
  };

  const handleLockScreen = async () => {
    try {
      if (PhoneControlModule && PhoneControlModule.lockDevice) {
        await PhoneControlModule.lockDevice();
        Alert.alert('Success', 'Device locked!');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not lock device: ' + error.message);
    }
  };

  const toggleManualControl = () => {
    setManualControl(!manualControl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Enigma 👋</Text>
      <Text style={styles.subtext}>Thanks for the gift! 🎁</Text>
      
      <View style={styles.countdownContainer}>
        <Text style={styles.countdown}>Auto-shutdown in: {countdown}s</Text>
      </View>

      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={toggleManualControl}
      >
        <Text style={styles.toggleButtonText}>
          {manualControl ? '🔒 Hide Controls' : '🎮 Show Controls'}
        </Text>
      </TouchableOpacity>

      {manualControl && (
        <View style={styles.controlPanel}>
          <Text style={styles.controlTitle}>Device Controls</Text>
          
          <TouchableOpacity 
            style={[styles.controlButton, styles.shutdownButton]}
            onPress={handleManualShutdown}
          >
            <Text style={styles.controlButtonText}>⏻️ Shutdown Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, styles.restartButton]}
            onPress={handleRestart}
          >
            <Text style={styles.controlButtonText}>🔄 Restart</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, styles.lockButton]}
            onPress={handleLockScreen}
          >
            <Text style={styles.controlButtonText}>🔐 Lock Screen</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.info}>
        Device will auto-shutdown after 3 seconds
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  greeting: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtext: {
    fontSize: 24,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  countdownContainer: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#ff4444',
  },
  countdown: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff4444',
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  toggleButtonText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controlPanel: {
    marginVertical: 20,
    backgroundColor: '#0f3460',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00d4ff',
    width: '100%',
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 15,
    textAlign: 'center',
  },
  controlButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 2,
  },
  shutdownButton: {
    backgroundColor: '#ff4444',
    borderColor: '#ff0000',
  },
  restartButton: {
    backgroundColor: '#ffaa00',
    borderColor: '#ff8800',
  },
  lockButton: {
    backgroundColor: '#4444ff',
    borderColor: '#0000ff',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    color: '#888',
    fontSize: 12,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default GreetingScreen;
