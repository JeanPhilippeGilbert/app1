// screens/ProfileStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import CameraScreen from './CameraScreen';
import AudioScreen from './AudioScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mon profil" component={ProfileScreen} />
      <Stack.Screen name="Paramètres" component={SettingsScreen} />
      <Stack.Screen name="Caméra" component={CameraScreen} />
      <Stack.Screen name="Audio" component={AudioScreen} />
    </Stack.Navigator>
  );
} 