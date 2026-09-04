import React, { useEffect } from 'react';
import { View, Text, StyleSheet, AppState } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';

const GreetingScreen = () => {
  useEffect(() => {
    // Display greeting for 3 seconds, then shutdown
    const timer = setTimeout(() => {
      shutdownPhone();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const shutdownPhone = async () => {
    try {
      // Use native modules to shutdown the device
      // Note: This requires native module implementation
      // For iOS: Cannot directly shutdown (system limitation)
      // For Android: Use native bridge to call shutdown command
      console.log('Initiating shutdown...');
      // Device shutdown logic would be implemented in native code
    } catch (error) {
      console.error('Shutdown error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Enigma there 👋</Text>
      <Text style={styles.subtext}>Thanks for the gift! 🎁</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
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
  },
});

export default GreetingScreen;
