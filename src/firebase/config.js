import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import 'firebase/firestore'
import 'firebase/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeHZkVthjAw0oIYUlLKwNSBWvrW4D7ki0",
  authDomain: "contact-dd22f.firebaseapp.com",
  projectId: "contact-dd22f",
  storageBucket: "contact-dd22f.appspot.com",
  messagingSenderId: "916777840712",
  appId: "1:916777840712:web:9ee3a7f1c78a69e361e87d",
  measurementId: "G-9G2SZYZCRJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })
  
  export default firebaseApp.firestore()

// init firebase
// firebase.initializeApp(firebaseConfig)

// const projectAuth = firebase.auth()
// const projectFirestore = firebase.firestore()
// const timestamp = firebase.firestore.FieldValue.serverTimestamp

// export { projectAuth, projectFirestore, timestamp }