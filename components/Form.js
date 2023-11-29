import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { db } from "../firebase";
import { Input, Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HealthForm({ navigation }) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState("General");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [healthProblem, setHealthProblem] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("email").then((email) => {
      setUserEmail(email);
      fetchUserName(email);
    });
  }, []);

  const fetchUserName = (email) => {
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const user = querySnapshot.docs[0].data();
          setUserName(user.name);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const submitForm = async () => {
    const formData = {
      name,
      age,
      gender,
      category,
      address,
      phone,
      bloodGroup,
      healthProblem,
      accessGiven: false,
    };

    try {
      const userCollectionRef = db.collection("users");
      const userQuery = userCollectionRef.where("email", "==", userEmail);

      const userDocs = await userQuery.get();

      if (!userDocs.empty) {
        const userDocRef = userDocs.docs[0].ref;
        const healthFormCollectionRef = userDocRef.collection("healthform");

        const docRef = await healthFormCollectionRef.add(formData);
        console.log("Document written with ID: ", docRef.id);

        setName("");
        setAge("");
        setGender("Male");
        setCategory("General");
        setAddress("");
        setPhone("");
        setBloodGroup("");
        setHealthProblem("");
        navigation.navigate("Home");
      } else {
        console.log("User not found with the specified email.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          leftIcon={
            <Icon color={"#d54903"} style={styles.icon} name="user" type="font-awesome" />
          }
          style={styles.input}
        />
        <Input
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          leftIcon={
            <Icon color={"#1870f5"} style={styles.icon} name="calendar" type="font-awesome" />
          }
          style={styles.input}
        />
        <View style={styles.pickerContainer}>
          <Icon color={"brown"} style={styles.icon} name="user" type="font-awesome" />
          <Text style={styles.pickerLabel}>Gender:</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        <View style={styles.horizontalLine}></View>
        <Input
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          leftIcon={
            <Icon color={"#28077b"} style={styles.icon} name="map-marker" type="font-awesome" />
          }
          style={styles.input}
        />
        <Input
          placeholder="Phone Number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          leftIcon={
            <Icon color={"green"} style={styles.icon} name="phone" type="font-awesome" />
          }
          style={styles.input}
        />
        <Input
          placeholder="Blood Group"
          value={bloodGroup}
          onChangeText={(text) => setBloodGroup(text)}
          leftIcon={
            <Icon color={"red"} style={styles.icon} name="tint" type="font-awesome" />
          }
          style={styles.input}
        />
        <Input
          placeholder="Describe Your Health Problem"
          value={healthProblem}
          onChangeText={(text) => setHealthProblem(text)}
          leftIcon={
            <Icon color={"red"} style={styles.icon} name="heartbeat" type="font-awesome" />
          }
          style={styles.input}
          multiline
          numberOfLines={4}
        />
        <Button title="Submit" onPress={submitForm} color="#f17f06" />
        <Text style={styles.dummy}></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:60,
    padding: 20,
    flex: 1,
    height: 1000,
  },
  form: {
    padding: 40,
    paddingRight: 8,
    paddingLeft: 8,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#c8560a",
    backgroundColor: "#ffe7d1",
  },
  input: {
    marginBottom: 5,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 10,
  },
  pickerLabel: {
    flex: 1,
    fontSize: 18,
  },
  picker: {
    flex: 2,
    height: 40,
  },
  dummy: {
    height: 20,
  },
  icon: {
    width: 30,
  },
  horizontalLine: {
    width: "95%", 
    height: 1, 
    backgroundColor: "#919191",
    marginLeft: 10,
    marginBottom: 15,
  },
});

export default HealthForm;
