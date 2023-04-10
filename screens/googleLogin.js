import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import { auth, provider } from '../index';
import { GoogleAuthProvider, signInWithCredential  } from 'firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';
import { requestPushNotificationPermission } from '../Notifications';


const GoogleLogin = ({ navigation }) => {
    useEffect(() => {
        GoogleSignin.configure({
          webClientId: '151797924443-qn35poqtbktt4hmc2gl8k4kjhu2avuf4.apps.googleusercontent.com',
        });
      }, []);

    const handleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();
            console.log("okay here");
            const credential = GoogleAuthProvider.credential(
              idToken,
              accessToken,
            );
            console.log("okay here 2");
            await signInWithCredential(auth, credential);

            // Call the requestPushNotificationPermission function after a successful login
            await requestPushNotificationPermission();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <View style={styles.container}>
      <Icon name="shopping-basket" size={100} color="#FFFFFF"/>
      <View style={{flexDirection: 'row'}}>
      <Text style={styles.firstTitle}>NTU</Text>
      <Text style={styles.secondTitle}>Share</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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

export default GoogleLogin;
