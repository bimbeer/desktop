import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getUserData } from './profiles';
import { db } from '../firebase/firebase';

const interactionsCollection = collection(db, 'interactions');

export const addPairs = async (currentUserId, recipentId, reactionType) => {
  await addDoc(interactionsCollection, {
    sender: currentUserId,
    recipent: recipentId,
    reactionType,
  });
};

export async function unpairUsers(currentUserId, recipentId) {
  const q1 = query(
    interactionsCollection,
    where('sender', '==', currentUserId),
    where('recipent', '==', recipentId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot1 = await getDocs(q1);

  querySnapshot1.forEach((doc) => {
    deleteDoc(doc.ref);
  });

  const q2 = query(
    interactionsCollection,
    where('sender', '==', recipentId),
    where('recipent', '==', currentUserId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot2 = await getDocs(q2);

  querySnapshot2.forEach((doc) => {
    deleteDoc(doc.ref);
  });
}

export async function checkForMatch(currentUserId, recipentId) {
  const q1 = query(
    interactionsCollection,
    where('sender', '==', currentUserId),
    where('recipent', '==', recipentId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot = await getDocs(q1);

  let user1LikedUser2 = false;
  if (!querySnapshot.empty) {
    user1LikedUser2 = true;
  }

  const q2 = query(
    interactionsCollection,
    where('sender', '==', recipentId),
    where('recipent', '==', currentUserId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot2 = await getDocs(q2);

  let user2LikedUser1 = false;
  if (!querySnapshot2.empty) {
    user2LikedUser1 = true;
  }

  return user1LikedUser2 && user2LikedUser1;
}

export async function getMatches(currentUserId) {
  const q1 = query(
    interactionsCollection,
    where('sender', '==', currentUserId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot = await getDocs(q1);
  const promises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const recipentId = data.recipent;
    const q2 = query(
      interactionsCollection,
      where('sender', '==', recipentId),
      where('recipent', '==', currentUserId),
      where('reactionType', '==', 'like')
    );
    const querySnapshot2 = await getDocs(q2);
    if (!querySnapshot2.empty) {
      const userData = await getUserData(recipentId);
      return { ...data, userData };
    }
    return null;
  });

  const results = await Promise.all(promises);
  const matches = results.filter((result) => result !== null);
  return matches;
}
