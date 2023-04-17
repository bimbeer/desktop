import {
  Box,
  List,
  ListItem,
  Avatar,
  Text,
  Center,
  Flex,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
  orderBy,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';

import { db, auth } from 'renderer/firebase/firebase';

export default function RecentChats() {
  const [recentChats, setRecentChats] = useState([]);
  const currentUserId = auth.currentUser.uid;

  useEffect(() => {
    const pairIdsQuery = query(
      collection(db, 'messages'),
      where('uid', '==', currentUserId)
    );

    onSnapshot(pairIdsQuery, async (querySnapshot) => {
      const pairIds = [];
      querySnapshot.forEach((document) => {
        const data = document.data();
        if (!pairIds.includes(data.pairId)) {
          pairIds.push(data.pairId);
        }
      });

      const chatsPromises = pairIds.map(async (pairId) => {
        const messagesQuery = query(
          collection(db, 'messages'),
          where('pairId', '==', pairId),
          orderBy('createdAt', 'desc'),
          limit(1)
        );

        let recipientData;
        const interactionsQuery = query(
          collection(db, 'interactions'),
          where('pairId', '==', pairId)
        );
        const interactionsSnapshot = await getDocs(interactionsQuery);
        if (!interactionsSnapshot.empty) {
          const interactionData = interactionsSnapshot.docs[0].data();
          const recipientId =
            interactionData.sender === currentUserId
              ? interactionData.recipient
              : interactionData.sender;
          const recipientDocRef = doc(db, 'profile', recipientId);
          const recipientDocSnap = await getDoc(recipientDocRef);
          if (recipientDocSnap.exists()) {
            recipientData = recipientDocSnap.data();
          }
        }

        const messagesSnapshot = await getDocs(messagesQuery);
        if (!messagesSnapshot.empty) {
          const data = messagesSnapshot.docs[0].data();
          return {
            id: messagesSnapshot.docs[0].id,
            name: `${recipientData.firstName} ${recipientData.lastName}`,
            avatar: recipientData.avatar,
            pairId: data.pairId,
            lastMessage: data.text,
          };
        }
      });

      Promise.all(chatsPromises).then((chats) => {
        setRecentChats(chats.filter((chat) => chat));
      });
    });
  }, [currentUserId]);

  return (
    <Box
      maxW="400px"
      w="30vw"
      h="60vh"
      overflow="hidden"
      bg="#242526"
      rounded="1rem"
      borderColor="yellow.500"
      borderWidth={1}
    >
      <Center>
        <Text fontSize={26} fontWeight={900} mt={4}>
          {' '}
          Recent Chats
        </Text>
      </Center>
      <List spacing={2} mt={4} mx={4}>
        {recentChats.map((chat) => (
          <Link to={`/messages/${chat.pairId}`}>
            <ListItem
              key={chat.id}
              p={4}
              rounded="1rem"
              _hover={{ bg: 'yellow.500' }}
              boxShadow="0px 5px 5px -5px rgba(0,0,0,0.75)"
              overflow="hidden"
            >
              <Flex align="center">
                <Avatar src={chat.avatar} size="md" mr={4} />
                <Flex direction="column">
                  <Text fontWeight="bold">{chat.name}</Text>
                  <Text fontSize="sm">{chat.lastMessage}</Text>
                </Flex>
              </Flex>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
