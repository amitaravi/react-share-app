import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
      console.log('User account created successfully!', userCredential.user.uid);
      // navigation.navigate('HomePage');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use'){
        console.log('That email is already in use!');
      }
      if (error.code === 'auth/invalid-email'){
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
        <Text style={styles.newUserBtn}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BCA0DC',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#1E1E1E'
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: '#1E1E1E',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '30%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  newUserBtn:{
    marginTop: 15,
    fontSize: 15,
    color: '#1E1E1E'
  }
});
