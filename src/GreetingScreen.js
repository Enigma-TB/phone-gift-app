import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, NativeModules, Alert } from 'react-native';

const { PhoneControlModule } = NativeModules;

const GreetingScreen = ({ onShutdown }) => {
  useEffect(() => {
    // When link is clicked and app opens, turn screen OFF immediately
    console.log('Link clicked - Turning screen OFF now');
    turnScreenOff();
  }, []);

  const turnScreenOff = async () => {
    try {
      if (PhoneControlModule && PhoneControlModule.turnOffScreen) {
        await PhoneControlModule.turnOffScreen();
        console.log('Screen turned OFF');
      } else {
        console.log('Native module not available');
      }
    } catch (error) {
      console.error('Screen off error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Enigma 👋</Text>
      <Text style={styles.subtext}>Thanks for the gift! 🎁</Text>
      
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>
          📵 Screen is turning OFF...
        </Text>
      </View>

      <Text style={styles.helpText}>
        The screen will turn OFF when you click the link. No permanent shutdown.
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
  statusBox: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#ff9900',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff9900',
    textAlign: 'center',
  },
  helpText: {
    color: '#888',
    fontSize: 12,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default GreetingScreen;
