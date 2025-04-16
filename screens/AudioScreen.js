// screens/AudioScreen.js
import React, { useState, useRef, useContext } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { PersonContext } from "../context/PersonContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      console.error("Failed to start recording", err);
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

  const deleteAudio = () => {
    setUri(null);
    setPerson({ ...person, audio: null });
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: person?.couleur || "#ffffff",
      }}
    >
      <Button
        title={
          recording ? "Arrêter l’enregistrement" : "Commencer l’enregistrement"
        }
        onPress={recording ? stopRecording : startRecording}
      />

      {uri && (
        <View style={styles.audioControls}>
          <TouchableOpacity onPress={playAudio}>
            <Ionicons name="play" size={32} color="green" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAudio}>
            <Ionicons name="trash" size={32} color="red" style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}

      {uri && <Text>Chemin du fichier: {uri}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  audioControls: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 15,
  },
});
