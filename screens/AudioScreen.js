// screens/AudioScreen.js
import React, { useState, useRef, useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { PersonContext } from '../context/PersonContext';

export default function AudioScreen() {
  const [recording, setRecording] = useState(null);
  const [uri, setUri] = useState(null);
  const { person, setPerson } = useContext(PersonContext);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setUri(uri);
    setPerson({ ...person, audio: uri });
  };

  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Arrêter l’enregistrement' : 'Commencer l’enregistrement'}
        onPress={recording ? stopRecording : startRecording}
      />
      {uri && <Button title="Jouer l’audio" onPress={playAudio} />}
      {uri && <Text>Chemin du fichier: {uri}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});