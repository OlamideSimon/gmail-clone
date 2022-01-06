import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB3S_xpq9q3fL0UFPE71DBEBoOD63cF01w",
    authDomain: "clone-3af8d.firebaseapp.com",
    projectId: "clone-3af8d",
    storageBucket: "clone-3af8d.appspot.com",
    messagingSenderId: "811019039283",
    appId: "1:811019039283:web:ab82cb5abedb86fe82a946"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };