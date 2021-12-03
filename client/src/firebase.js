
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDKoll-uSQjQNaHltvLUfQMTt4u5rw42Nc",
  authDomain: "test-for-reindeer.firebaseapp.com",
  projectId: "test-for-reindeer",
  storageBucket: "test-for-reindeer.appspot.com",
  messagingSenderId: "123819744477",
  appId: "1:123819744477:web:410fd72fcef8698ce64f34"
};
 
const app = initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

export const signWithPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        throw error;
    }
};

export const registerWithPassword = async (email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection('users').add({
            uid: user.uid,
            authProvider: 'local',
            email
        })
    } catch (error) {
        throw error;
    }
};

export const sendPasswordResetEmail = async email => {
    try {
        await auth.sendPasswordResetEmail(email);
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    auth.signOut();
}; 