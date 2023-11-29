import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView,TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { auth } from "../firebase";
import { db } from "../firebase";
import { Picker } from "@react-native-picker/picker";

function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Patient");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = {
          name: name,
          email: email.toLowerCase(),
          age: age,
          gender: gender,
          address: address,
          phone: phone,
          bloodGroup: bloodGroup,
        };

        if (category === "Patient") {
          db.collection("users").add(user);
        } else {
          db.collection("Doctors").add(user);
        }

        setName("");
        setEmail("");
        setPassword("");
        setError("");
        navigation.navigate("Login");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.registercontainer}>
        <Text style={styles.header}>Register</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="Patient" value="patient" />
          <Picker.Item label="Doctor" value="doctor" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={setAge}
        />

        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={setGender}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Blood Group"
          onChangeText={setBloodGroup}
        />
        <Text style={{ height: 20, color: "red" }}>
          {error ? error.substring(10) : null}
        </Text>

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: "#28a745",
            padding: 10,
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            {" "}
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 15,
    paddingTop: 70,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  registercontainer: {
    paddingLeft: 15,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 30,
    borderRadius: 30,
    borderWidth: 4,
    backgroundColor: "lightgreen",
    elevation: 4,
    borderColor: "#29be15a1",
    shadowColor: "#038ae4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  input: {
    width: 315,
    height: 40,
    fontSize: 17,
    borderColor: "green",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  picker: {
    backgroundColor: "white",
    height: 40,
    width: 315,
    marginBottom: 15,
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  loginLink: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#00b109",
  },
});

export default Register;
