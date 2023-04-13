import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../firebase/firebase';

export async function sendMessage(senderId, message, pairId) {
  const profileDocRef = doc(db, 'profile', senderId);
  const profileDocSnap = await getDoc(profileDocRef);
  const profileData = profileDocSnap.data();
  const { avatar } = profileData;
  await addDoc(collection(db, 'messages'), {
    text: message,
    avatar,
    createdAt: serverTimestamp(),
    pairId,
    uid: senderId,
    status: 'sent',
  });
}

export async function handleReadMessage(messageId) {
  const messageRef = doc(db, 'messages', messageId);
  await updateDoc(messageRef, {
    status: 'read',
  });
}
