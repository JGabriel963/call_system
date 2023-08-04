import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB1fAAY_IeiLBvKZUywFyRAYHeOYobaUSc",
    authDomain: "curso-sj.firebaseapp.com",
    projectId: "curso-sj",
    storageBucket: "curso-sj.appspot.com",
    messagingSenderId: "288025942537",
    appId: "1:288025942537:web:1d6d5d801aa121ded2f6d8",
    measurementId: "G-Z13GV0W098"
  };

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage}