import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import 'firebase/firestore'
import 'firebase/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6WPLcYvVYmPkeknO1vTZe4E70tfRYX4Q",
  authDomain: "mycontacts-805ff.firebaseapp.com",
  projectId: "mycontacts-805ff",
  storageBucket: "mycontacts-805ff.appspot.com",
  messagingSenderId: "1012793606037",
  appId: "1:1012793606037:web:d5f816021166f17165809c",
  measurementId: "G-Q8BX5X90C3"
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