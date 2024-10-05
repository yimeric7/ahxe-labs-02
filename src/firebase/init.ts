import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDv2ORb85k1vMbLUhdOehR_r41Mznx1f5c",
  authDomain: "ahxe-labs-02.firebaseapp.com",
  projectId: "ahxe-labs-02",
  storageBucket: "ahxe-labs-02.appspot.com",
  messagingSenderId: "806427611664",
  appId: "1:806427611664:web:eb4aaafd822041de5df095",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

