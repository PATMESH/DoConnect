import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Register from "./components/Signup";
import Login from "./components/Login";
import DocHome from "./components/DocHome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from './components/LoadingIndiacator';
import Problems from "./components/PatientProbelms";
import Profile from "./components/Profile";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Settings from "./components/Settings";
import { StyleSheet, View } from "react-native";
import HealthForm from "./components/Form";
import DoConnect from "./components/Doconnect";

library.add(faHome, faUser, faCog);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      const login = await AsyncStorage.getItem("email");
      const category = await AsyncStorage.getItem("category");
      if (login) {
        setInitialRoute(category === "doctor" ? "DoctorHome" : "UserHome");
        setScreen(category === "doctor" ? "MainDoctor" : "MainUser");
      } else {
        setInitialRoute("Login");
      }
      setTimeout(() => {
        setLoading(false); 
      }, 3000);
    }

    checkAuthentication();
  }, []);

  if (loading) {
    return <DoConnect />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screen}>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="MainDoctor">
          {() => <MainDoctor initialRoute={initialRoute} />}
        </Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="MainUser">
          {() => <MainUser initialRoute={initialRoute} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainDoctor({ initialRoute }) {
  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = faHome;
          } else if (route.name === "Profile") {
            iconName = faUser;
          } else if (route.name === "Settings") {
            iconName = faCog;
          }

          return (
            <FontAwesomeIcon icon={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#123457",
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabStyle: {
          borderRadius: 50,
        },
        activeBackgroundColor: "#ececec",
      }}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {() => <HomeDoctorScreen initialRoute={initialRoute} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

function MainUser({ initialRoute }) {
  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = faHome;
          } else if (route.name === "Profile") {
            iconName = faUser;
          } else if (route.name === "Settings") {
            iconName = faCog;
          }

          return (
            <FontAwesomeIcon icon={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#123457",
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        tabStyle: {
          borderRadius: 50,
        },
        activeBackgroundColor: "#ececec",
      }}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {() => <HomeUserScreen initialRoute={initialRoute} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

function HomeUserScreen({ initialRoute }) {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="UserHome"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Form"
        component={HealthForm}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomeDoctorScreen({ initialRoute }) {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="DoctorHome"
        component={DocHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Problems"
        component={Problems}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <Stack.Navigator initialRouteName="ProfilePage">
      <Stack.Screen
        name="ProfilePage"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="editProfile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <Stack.Navigator initialRouteName="SettingsPage">
      <Stack.Screen
        name="SettingsPage"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
