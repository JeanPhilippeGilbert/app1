// screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { PersonContext } from '../context/PersonContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';

export default function ProfileScreen() {
  const { person } = useContext(PersonContext);
  const navigation = useNavigation();

  const playAudio = async () => {
    if (person.audio) {
      const { sound } = await Audio.Sound.createAsync({ uri: person.audio });
      await sound.playAsync();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: person.couleur }]}>
      <Text style={styles.title}>{person.nom}</Text>
      <Image
        source={person.image ? { uri: person.image } : require('../assets/default-avatar.png')}
        style={styles.image}
      />
      <View style={styles.icons}>
        <Ionicons name="camera" size={32} onPress={() => navigation.navigate('Caméra')} />
        <Ionicons name="mic" size={32} onPress={() => navigation.navigate('Audio')} />
        <Ionicons name="play" size={32} onPress={playAudio} />
        <Ionicons name="settings" size={32} onPress={() => navigation.navigate('Paramètres')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  icons: {
    flexDirection: 'row',
    gap: 20,
  },
});