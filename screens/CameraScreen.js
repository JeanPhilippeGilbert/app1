// screens/CameraScreen.js
import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { PersonContext } from "../context/PersonContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef(null);
  const { person, setPerson } = useContext(PersonContext);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      setPerson({ ...person, image: asset.uri });
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>Pas d'accès à la caméra</Text>;

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: person?.couleur || "#ffffff",
      }}
    >
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.controls}>
          <Ionicons
            name="camera-reverse"
            size={32}
            onPress={() => setFacing(facing === "back" ? "front" : "back")}
          />
          <Ionicons
            name="flash"
            size={32}
            onPress={() =>
              setFlash(
                flash === ExpoCamera.Constants.FlashMode.off
                  ? ExpoCamera.Constants.FlashMode.on
                  : ExpoCamera.Constants.FlashMode.off
              )
            }
          />
          <Ionicons name="camera" size={32} onPress={takePhoto} />
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
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
