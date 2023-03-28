import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        // navigation.navigate('HomePage');
        console.log("user signed in")
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Icon name="shopping-basket" size={100} color="#FFFFFF"/>
      <View style={{flexDirection: 'row'}}>
      <Text style={styles.firstTitle}>NTU</Text>
      <Text style={styles.secondTitle}>Share</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.newUserBtn}>New User?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BCA0DC',
  },
  firstTitle: {
    fontSize: 34,
    marginBottom: 16,
    color:"#FFFFFF",
    fontWeight: "500"
     },
  secondTitle: {
    fontSize: 34,
    marginBottom: 16,
    marginLeft: 10,
    color: "#1E1E1E",
    fontWeight: "800"
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
  registerButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  },
  newUserBtn:{
    marginTop: 15,
    fontSize: 20,
    color: '#1E1E1E'
  }
});

export default LoginScreen;
