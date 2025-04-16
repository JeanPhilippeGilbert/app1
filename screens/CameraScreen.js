import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { PersonContext } from "../context/PersonContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, setMediaPermission] = useState(false);
  const [facing, setFacing] = useState('back'); 
  const [flash, setFlash] = useState('off'); 
  const [zoom, setZoom] = useState(0); 
  const cameraRef = useRef(null);
  const { person, setPerson } = useContext(PersonContext);

  useEffect(() => {
    (async () => {
      if (!permission?.granted) await requestPermission();
      const media = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(media.status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (mediaPermission) {
          const asset = await MediaLibrary.createAssetAsync(photo.uri);
          setPerson({ ...person, image: photo.uri });
        }
      } catch (error) {
        console.error("Erreur lors de la prise de photo :", error);
      }
    }
  };

  if (permission?.granted === null) return <View />;
  if (permission?.granted === false) return <Text>Pas d'accès à la caméra</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flash}
        zoom={zoom}
        ref={cameraRef}
      >
        <View style={styles.controlsTop}>
          <Ionicons
            name="camera-reverse"
            size={32}
            color="#fff"
            onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
          />
          <Ionicons
            name={flash === 'off' ? 'flash-off' : 'flash'}
            size={32}
            color="#fff"
            onPress={() => setFlash(flash === 'off' ? 'on' : 'off')}
          />
          <Ionicons
            name="remove"
            size={32}
            color="#fff"
            onPress={() => setZoom(prev => Math.max(0, prev - 0.1))}
          />
          <Ionicons
            name="add"
            size={32}
            color="#fff"
            onPress={() => setZoom(prev => Math.min(1, prev + 0.1))}
          />
        </View>

        <View style={styles.controlsBottom}>
          <TouchableOpacity style={styles.shutterButton} onPress={takePhoto}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  controlsTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controlsBottom: {
    alignItems: 'center',
    marginBottom: 30,
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});
