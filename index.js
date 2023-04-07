import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import 'firebase/database';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

export{db, auth}; 

AppRegistry.registerComponent(appName, () => App);

