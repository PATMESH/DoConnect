import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase';
const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const catgry = await AsyncStorage.getItem('category');
        setCategory(catgry);
        const email = await AsyncStorage.getItem('email');
        setUserEmail(email);
        const name = await AsyncStorage.getItem('userName');
        setUserName(name);

        if (email && category) {
          const collection = category === 'patient' ? 'users' : 'Doctors';
          const usersCollection = db.collection(collection);
          const querySnapshot = await usersCollection.where('email', '==', email.toLowerCase()).get();

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUser(userData);
            });
          } else {
            console.log('No user found. ' + category);
          }
        }
        if(user)setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        if(user)setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.profileCard}>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
            <View style={styles.userInfo}>
              {renderUserInfo('Age', user.age)}
              {renderUserInfo('Gender', user.gender)}
              {renderUserInfo('Blood Group', user.bloodGroup)}
              {renderUserInfo('Address', user.address)}
            </View>
        </View>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("editProfile")} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderUserInfo = (label, value) => (
  <View style={styles.userInfoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.info}>{value}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#535353',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#777',
  },
  userInfo: {
    marginTop: 20,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    color: '#007bff',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  editButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile;
