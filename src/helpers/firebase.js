import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2mqrNjIzfmg2ZynovcgX-lMy4bCS63Ug",
  authDomain: "pixelloop-66717.firebaseapp.com",
  projectId: "pixelloop-66717",
  storageBucket: "pixelloop-66717.firebasestorage.app",
  messagingSenderId: "1096770539457",
  appId: "1:1096770539457:web:698d1ba4fa2ae66a38a940",
  measurementId: "G-T8WBJW79P2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);