import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const App = () => {
  const [selectedGif, setSelectedGif] = useState(null);
  const [gifUri, setGifUri] = useState(null);

  const pickGif = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setSelectedGif(result.name);
      setGifUri(result.uri);
      Alert.alert('Success', `Selected: ${result.name}`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  const sendGif = async () => {
    if (!gifUri) {
      Alert.alert('Error', 'Please select a GIF first');
      return;
    }

    try {
      await Share.open({
        url: gifUri,
        title: 'Check out this GIF!',
        message: 'I sent you a special GIF. Download and open it!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GIF Gift Sender</Text>

      <TouchableOpacity style={styles.button} onPress={pickGif}>
        <Text style={styles.buttonText}>📁 Select GIF</Text>
      </TouchableOpacity>

      {selectedGif && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>Selected: {selectedGif}</Text>
          {gifUri && <Image source={{ uri: gifUri }} style={styles.preview} />}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, !gifUri && styles.disabledButton]}
        onPress={sendGif}
        disabled={!gifUri}
      >
        <Text style={styles.buttonText}>🚀 Send GIF</Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        The recipient will see a greeting message and their phone will auto-shutdown!
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  disabledButton: {
    opacity: 0.5,
    borderColor: '#666',
  },
  buttonText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  selectedText: {
    color: '#00d4ff',
    fontSize: 14,
    marginBottom: 10,
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  info: {
    color: '#888',
    fontSize: 12,
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default App;
