import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { db } from '../firebase';
import LoadingIndicator from './LoadingIndiacator';

const defaultProfilePicture = 'https://img.freepik.com/premium-photo/round-user-icon-isolated-white-background-3d-rendering_499459-408.jpg';

function Problems() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const usersCollection = db.collection('users');
    usersCollection.get().then((querySnapshot) => {
      const userList = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        userList.push(user);
      });
      setUsers(userList);
      setIsLoading(false);
    });
  }, []);

  const handleViewUser = (user) => {
  };

  if(isLoading){
    return <LoadingIndicator/>
  }

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {users.map((user, index) => (
            <View style={styles.userCard} key={index}>
              <View style={styles.cardRow}>
                <Image
                  source={{ uri: user.profilePicture || defaultProfilePicture }}
                  style={styles.userProfile}
                />
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userAge}>Age: {user.age}</Text>
                  <Text style={styles.userBloodGroup}>Blood Group: {user.bloodGroup}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewButton} onPress={() => handleViewUser(user)}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:80,
    paddingBottom: 1,
    justifyContent: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  userProfile: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  userDetails: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userAge: {
    fontSize: 14,
  },
  userBloodGroup: {
    fontSize: 14,
  },
  viewButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Problems;
