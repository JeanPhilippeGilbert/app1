// screens/AccueilScreen.js
import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { PersonContext } from "../context/PersonContext";
import { useNavigation } from "@react-navigation/native";

export default function AccueilScreen() {
  const { person, setPerson, setLoggedIn } = useContext(PersonContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === "user" && password === "pass") {
      setLoggedIn(true);
      setPerson({ ...person, nom: username, motDePasse: password });

      setTimeout(() => {
        navigation.navigate("Profil", { person });
      }, 100); //this is here to avoid error of navigator not being rendered?
    } else {
      alert("Nom ou mot de passe incorrect");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </Pressable>
      <Text style={styles.footer}>Jean-Philippe + Tristan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    fontSize: 14,
    color: "gray",
  },
});
