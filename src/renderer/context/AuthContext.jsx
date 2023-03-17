import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const GoogleProvider = new GoogleAuthProvider();
    signInWithRedirect(auth, GoogleProvider);
  };

  const facebookSignIn = () => {
    const FacebookProvider = new FacebookAuthProvider();
    signInWithRedirect(auth, FacebookProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', currentUser.uid), {
            userId: currentUser.uid,
            emailAddress: currentUser.email.toLowerCase(),
            dateCreated: currentUser.metadata.creationTime,
          });
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ createUser, user, logout, signIn, googleSignIn, facebookSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
