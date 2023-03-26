import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config details here
  apiKey: 'AIzaSyCrm7vNSnCyZ7_Ui13wCCagEoXy6J-OmO8',
  authDomain: 'ntushare-6e50d.firebaseapp.com',
  projectId: 'ntushare-6e50d',
  storageBucket: 'ntushare-6e50d.appspot.com',
  messagingSenderId: '151797924443',
  appId: '1:151797924443:web:dc2dc552970c0c1522757e',
  measurementId: 'G-0D2DTGYSHT',
};

firebase.initializeApp(firebaseConfig);

export default firebase;