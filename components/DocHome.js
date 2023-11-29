import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase";
import LoadingIndicator from "./LoadingIndiacator";

function DocHome({ navigation }) {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        const usersCollection = db.collection("Doctors");
        const querySnapshot = await usersCollection.where("email", "==", email.toLowerCase()).get();
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            setUserName(user.name);
            AsyncStorage.setItem("userName", user.name);
          }); 
        } else {
          console.log("No user found.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsLoading(false); 
      }
    };
    
    fetchUserName();
    
  }, []);

  if(isLoading){
    return <LoadingIndicator/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.appName}>👨‍⚕️🩺Doconnect</Text>
      </View>

      <View>
        <Text style={styles.uname}>Hello, Dr. {userName}!</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Doctor and Patient Interaction</Text>
        <Text style={styles.description}>
          Welcome to the Doconnect app, your platform for seamless interaction
          between doctors and patients.
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("Problems")}
        >
          <Text style={styles.startButtonText}>See All Patients problems</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 10,
  },
  uname: {
    marginTop: 29,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 6,
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  startButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DocHome;
