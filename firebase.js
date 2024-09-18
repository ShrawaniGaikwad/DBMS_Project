// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth ,createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO9mL6eSUwwKET03xRNNYdT81TJm_MwgA",
  authDomain: "autospareparts5.firebaseapp.com",
  projectId: "autospareparts5",
  storageBucket: "autospareparts5.appspot.com",
  messagingSenderId: "170347738921",
  appId: "1:170347738921:web:8fc0f70d60794c0ecce938",
  measurementId: "G-9B3150K4DN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db ,createUserWithEmailAndPassword};
