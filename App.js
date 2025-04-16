import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PersonContext, PersonProvider } from "./context/PersonContext";
import ProfileStack from "./screens/ProfileStack";
import CameraScreen from "./screens/CameraScreen";
import AudioScreen from "./screens/AudioScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AccueilScreen from "./screens/AccueilScreen";

const Tab = createBottomTabNavigator();

function MainApp() {
  const { loggedIn } = useContext(PersonContext);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Profil") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Caméra") {
                iconName = focused ? "camera" : "camera-outline";
              } else if (route.name === "Audio") {
                iconName = focused ? "musical-notes" : "musical-notes-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Profil" component={ProfileStack} />
          <Tab.Screen name="Caméra" component={CameraScreen} />
          <Tab.Screen name="Audio" component={AudioScreen} />
        </Tab.Navigator>
      ) : (
        <AccueilScreen />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PersonProvider>
      <MainApp />
    </PersonProvider>
  );
}
