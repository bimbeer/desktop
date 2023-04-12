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

export async function getUsersWithMatchingBeersAndInterests(
  currentUserId,
  profileData
) {
  let matchedUsers = [];

  const genders = ['Man', 'Woman', 'Other'];
  const interests = [profileData.gender, 'All'];

  async function getMatchedUsers(gender, interest) {
    const beerChunks = [];
    for (let i = 0; i < profileData.beers.length; i += 10) {
      beerChunks.push(profileData.beers.slice(i, i + 10));
    }

    const promises = beerChunks.map(async (beers) => {
      let q;
      if (profileData.interest === 'All') {
        q = query(
          profileCollection,
          where('beers', 'array-contains-any', beers),
          where('gender', '==', gender),
          where('__name__', '!=', currentUserId),
          where('interest', '==', interest)
        );
      } else {
        q = query(
          profileCollection,
          where('beers', 'array-contains-any', beers),
          where('interest', '==', profileData.gender),
          where('gender', '==', profileData.interest),
          where('__name__', '!=', currentUserId)
        );
      }

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        const data = document.data();
        data.id = document.id;
        matchedUsers.push(data);
      });
    });

    await Promise.all(promises);
  }

  const promises = [];
  for (const gender of genders) {
    for (const interest of interests) {
      promises.push(getMatchedUsers(gender, interest));
    }
  }
  await Promise.all(promises);

  matchedUsers = [...new Set(matchedUsers)];
  return matchedUsers;
}
