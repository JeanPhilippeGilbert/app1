import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PersonProvider } from './context/PersonContext'; // Contexte global
import ProfileStack from './screens/ProfileStack'; // Stack pour les profils
import CameraScreen from './screens/CameraScreen'; // Écran caméra
import AudioScreen from './screens/AudioScreen'; // Écran audio
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PersonProvider> 
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Profil') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Caméra') {
                iconName = focused ? 'camera' : 'camera-outline';
              } else if (route.name === 'Audio') {
                iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Profil" component={ProfileStack} />
          <Tab.Screen name="Caméra" component={CameraScreen} />
          <Tab.Screen name="Audio" component={AudioScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PersonProvider>
  );
}
