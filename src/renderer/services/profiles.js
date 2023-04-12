import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { db } from '../firebase/firebase';

const profileCollection = collection(db, 'profile');

export async function getUserData(userId) {
  const docRef = doc(profileCollection, userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return undefined;
}

export async function getUsersWithMatchingBeers(currentUserId, profileData) {
  const matchedUsers = [];

  const beerChunks = [];
  for (let i = 0; i < profileData.beers.length; i += 10) {
    beerChunks.push(profileData.beers.slice(i, i + 10));
  }

  const promises = beerChunks.map(async (beers) => {
    const q = query(
      profileCollection,
      where('beers', 'array-contains-any', beers),
      where('__name__', '!=', currentUserId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      const data = document.data();
      data.id = document.id;
      matchedUsers.push(data);
    });
  });

  await Promise.all(promises);

  return matchedUsers;
}

export function getUsersWithMatchingInterests(
  currentUserId,
  profileData,
  users
) {
  return users.filter((user) => {
    if (profileData.interest === 'All') {
      return user.interest === profileData.gender || user.interest === 'All';
    }
    return (
      user.gender === profileData.interest &&
      (user.interest === profileData.gender || user.interest === 'All')
    );
  });
}
