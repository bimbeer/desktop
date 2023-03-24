import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBuuBldZLbOnJYVea1sHs5247GuXBYYmK0',
  authDomain: 'bimbeer-af1dd.firebaseapp.com',
  projectId: 'bimbeer-af1dd',
  storageBucket: 'bimbeer-af1dd.appspot.com',
  messagingSenderId: '41820867549',
  appId: '1:41820867549:web:552421a37e58cb79ef0434',
  measurementId: 'G-ET9H0R1DT6',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { googleProvider, facebookProvider, auth, db };
export default app;
