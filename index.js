import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';


import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import AddProduct from './screens/AddProduct';
import EditProduct from './screens/EditProduct';
import UserProducts from './screens/UserProducts';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();




const firebaseConfig = {
  apiKey: 'AIzaSyCrm7vNSnCyZ7_Ui13wCCagEoXy6J-OmO8',
  authDomain: 'ntushare-6e50d.firebaseapp.com',
  projectId: 'ntushare-6e50d',
  storageBucket: 'ntushare-6e50d.appspot.com',
  messagingSenderId: '151797924443',
  appId: '1:151797924443:web:dc2dc552970c0c1522757e',
  measurementId: 'G-0D2DTGYSHT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
AppRegistry.registerComponent(appName, () => App);