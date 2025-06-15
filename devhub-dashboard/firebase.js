import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZJ4n_LIrxBkW_VcgX6HQh0q4XU-qkZ-o",
  authDomain: "devhub-fb369.firebaseapp.com",
  projectId: "devhub-fb369",
  storageBucket: "devhub-fb369.firebasestorage.app",
  messagingSenderId: "206220849740",
  appId: "1:206220849740:web:3c3ce574cc5122d776fae9",
  measurementId: "G-MS28T94NB9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
