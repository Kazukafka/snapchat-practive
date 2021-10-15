import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1uQIBqqQkcV2XAQ_eGDUaC3j1CTVhnmI",
  authDomain: "snapy-fefcd.firebaseapp.com",
  projectId: "snapy-fefcd",
  storageBucket: "snapy-fefcd.appspot.com",
  messagingSenderId: "767330562972",
  appId: "1:767330562972:web:469ecec09b7cd4e7f08e59"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
