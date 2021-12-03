
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,  } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKoll-uSQjQNaHltvLUfQMTt4u5rw42Nc",
  authDomain: "test-for-reindeer.firebaseapp.com",
  projectId: "test-for-reindeer",
  storageBucket: "test-for-reindeer.appspot.com",
  messagingSenderId: "123819744477",
  appId: "1:123819744477:web:410fd72fcef8698ce64f34"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signWithPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
};

export const registerWithPassword = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            email,
            authProvider: 'local',
        });
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

export const logout = async () => {
    await signOut(auth);
}; 