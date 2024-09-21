// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth ,createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "auth",
  projectId: "projectID",
  storageBucket: "storageBucket",
  messagingSenderId: "messaging",
  appId: "apiID",
  measurementId: "measurementID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db ,createUserWithEmailAndPassword};
