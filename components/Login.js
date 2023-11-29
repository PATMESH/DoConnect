import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import firebase from "firebase/compat";
import { StyleSheet } from "react-native";
import { auth } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase";
import LottieView from "lottie-react-native";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("patient");
  const [error, setError] = useState("");

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        AsyncStorage.setItem("email", email.toLowerCase());
        setEmail("");
        setPassword("");
        setError("");
        if (category === "patient") {
          AsyncStorage.setItem("category", category);
          navigation.navigate("MainUser");
        } else {
          AsyncStorage.setItem("category", category);
          navigation.navigate("MainDoctor");
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <View style={styles.container}>
    <LottieView
          source={require("./animation_loc56irw.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      <View style={styles.logincontainer}>
        <Text style={styles.header}>Login</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="Patient" value="patient" />
          <Picker.Item label="Doctor" value="doctor" />
        </Picker>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Text style={{ height: 20, color: "red" , fontWeight:"bold"}}>
          {error ? error.substring(10) : null}
        </Text>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registertext}>
          Don't have an account?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  animation: {
    width: 220,
    height: 150,
    top:55,
    zIndex:2,
  },
  logincontainer: {
    position:"relative",
    paddingLeft: 16,
    paddingTop: 60,
    paddingRight: 16,
    paddingBottom: 50,
    borderRadius: 10,
    backgroundColor: "#51b6d8ea",
    borderRadius: 30,
    elevation: 35,
    shadowColor: "#20adff",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },

  header: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: 315,
    height: 50,
    borderColor: "#418CFF",
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "white",
    height: 10,
    width: 315,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 15,
    width: 300,
  },

  loginButtonText: {
    color: "white",
    textAlign: "center",
  },
  registertext: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  registerLink: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Login;
