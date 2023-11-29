import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD88GNzpcL0Tfm9Jaht9Oi_osFc5rbs_Rk",
  authDomain: "doconnect-healthcare.firebaseapp.com",
  projectId: "doconnect-healthcare",
  storageBucket: "doconnect-healthcare.appspot.com",
  messagingSenderId: "357573978519",
  appId: "1:357573978519:web:5aa9cf70237684322c7cd2",
  measurementId: "G-84FXFRGGT0"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };


