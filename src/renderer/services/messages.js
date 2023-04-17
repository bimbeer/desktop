import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { db } from '../firebase/firebase';

export async function sendMessage(senderId, message, pairId) {
  await addDoc(collection(db, 'messages'), {
    text: message,
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

export function useRecipient(pairId, senderId) {
  const [recipientId, setRecipientId] = useState(null);
  const [recipientData, setRecipientData] = useState('');

  useEffect(() => {
    const getRecipientId = async () => {
      const q = query(
        collection(db, 'interactions'),
        where('pairId', '==', pairId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setRecipientId(data.sender === senderId ? data.recipient : data.sender);
      }
    };
    getRecipientId();
  }, [pairId, senderId]);

  useEffect(() => {
    if (recipientId) {
      const getRecipientData = async () => {
        const docRef = doc(db, 'profile', recipientId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipientData(docSnap.data());
        }
      };
      getRecipientData();
    }
  }, [recipientId]);

  return { recipientId, recipientData };
}
