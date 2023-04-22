import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { getUserData } from './profiles';
import { db } from '../firebase/firebase';

const interactionsCollection = collection(db, 'interactions');

export const addPairs = async (currentUserId, recipientId, reactionType) => {
  await addDoc(interactionsCollection, {
    sender: currentUserId,
    recipient: recipientId,
    reactionType,
  });
};

export async function unpairUsers(currentUserId, recipientId) {
  const q1 = query(
    interactionsCollection,
    where('sender', '==', currentUserId),
    where('recipient', '==', recipientId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot1 = await getDocs(q1);

  querySnapshot1.forEach((doc) => {
    deleteDoc(doc.ref);
  });

  const q2 = query(
    interactionsCollection,
    where('sender', '==', recipientId),
    where('recipient', '==', currentUserId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot2 = await getDocs(q2);

  querySnapshot2.forEach((doc) => {
    deleteDoc(doc.ref);
  });
}

export async function checkForMatch(currentUserId, recipientId) {
  const q1 = query(
    interactionsCollection,
    where('sender', '==', currentUserId),
    where('recipient', '==', recipientId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot = await getDocs(q1);

  let user1LikedUser2 = false;
  if (!querySnapshot.empty) {
    user1LikedUser2 = true;
  }

  const q2 = query(
    interactionsCollection,
    where('sender', '==', recipientId),
    where('recipient', '==', currentUserId),
    where('reactionType', '==', 'like')
  );
  const querySnapshot2 = await getDocs(q2);

  let user2LikedUser1 = false;
  if (!querySnapshot2.empty) {
    user2LikedUser1 = true;
  }

  if (user1LikedUser2 && user2LikedUser1) {
    const pairId = uuidv4();

    const q3 = query(
      interactionsCollection,
      where('sender', '==', currentUserId),
      where('recipient', '==', recipientId)
    );
    const querySnapshot3 = await getDocs(q3);

    const q4 = query(
      interactionsCollection,
      where('sender', '==', recipientId),
      where('recipient', '==', currentUserId)
    );
    const querySnapshot4 = await getDocs(q4);

    querySnapshot3.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        pairId,
      });
    });
    querySnapshot4.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        pairId,
      });
    });
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
    const recipientId = data.recipient;

    const q2 = query(
      interactionsCollection,
      where('sender', '==', recipientId),
      where('recipient', '==', currentUserId),
      where('reactionType', '==', 'like')
    );
    const querySnapshot2 = await getDocs(q2);

    if (!querySnapshot2.empty) {
      const userData = await getUserData(recipientId);
      return { ...data, userData };
    }

    return null;
  });

  const results = await Promise.all(promises);
  const matches = results.filter((result) => result !== null);

  return matches;
}

export async function getInteractedUsers(currentUserId) {
  const q = query(
    interactionsCollection,
    where('sender', '==', currentUserId),
    where('reactionType', 'in', ['dislike', 'like'])
  );

  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => doc.data().recipient);

  return users;
}
