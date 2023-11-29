import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./animation_loc56irw.json')} 
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white",
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 5,
    fontSize: 20,
    fontWeight:"bold",
  },
});

export default LoadingIndicator;
