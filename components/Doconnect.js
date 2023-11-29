import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

const DoConnect = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <LottieView
        source={require('./animation_loc56irw.json')} 
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>DoConnect</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  animation: {
    width: 400,
    height: 400,
  },
  text: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default DoConnect;
