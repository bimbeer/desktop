import React, { useEffect, useState } from 'react';
import BimbeerCard from 'renderer/components/BimbeerCard.jsx';
import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import { db } from '../firebase/firebase';

export default function Profile() {
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const userId = getUserFromLocalStorage();
    const docRef = doc(db, 'profile', userId);

    async function fetchData() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      }
    }
    fetchData();
  }, []);

  async function getUsersWithMatchingBeersAndInterests() {
    const userId = getUserFromLocalStorage();
    let users = [];

    const genders = ['Man', 'Woman', 'Other'];
    const interests = [profileData.gender, 'All'];

    for (const gender of genders) {
      for (const interest of interests) {
        let q;
        if (profileData.interest === 'All') {
          q = query(
            collection(db, 'profile'),
            where('beers', 'array-contains-any', profileData.beers),
            where('gender', '==', gender),
            where('__name__', '!=', userId),
            where('interest', '==', interest)
          );
        } else {
          q = query(
            collection(db, 'profile'),
            where('beers', 'array-contains-any', profileData.beers),
            where('interest', '==', profileData.gender),
            where('gender', '==', profileData.interest),
            where('__name__', '!=', userId)
          );
        }
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          users.push(document.data());
        });
      }
    }
    users = [...new Set(users)];
    console.log(profileData.interest);
    console.log(users);
  }

  return (
    <>
      <Sidebar />
      <button onClick={getUsersWithMatchingBeersAndInterests}> EEEEEEEEEEEEEEE </button>
      <BimbeerCard />
    </>
  );
}
