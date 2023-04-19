import {
  Box,
  List,
  ListItem,
  Avatar,
  Text,
  Center,
  Flex,
  Stack,
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
} from 'firebase/firestore';
import { Link } from 'react-router-dom';

import { db, auth } from 'renderer/firebase/firebase';
import { fetchRecentChatsData } from 'renderer/services/messages';
import sadBeer from 'renderer/assets/images/sadBeer.png';
import InfoCard from '../InfoCard';
import BimbeerSpinner from '../BimbeerSpinner';
import TimeSinceLastMessage from './TimeSinceLastMessage';

export default function RecentChats() {
  const [recentChats, setRecentChats] = useState([]);
  const [areChatsLoading, setAreChatsLoading] = useState(true);
  const currentUserId = auth.currentUser.uid;

  useEffect(() => {
    const updateRecentChats = async () => {
      const interactionsQuery = query(
        collection(db, 'interactions'),
        where('sender', '==', currentUserId)
      );
      const interactionsSnapshot = await getDocs(interactionsQuery);
      const pairIds = interactionsSnapshot.docs
        .map((doc) => doc.data().pairId)
        .filter((pairId) => pairId !== undefined);

      const chats = [];
      for (const pairId of pairIds) {
        const messagesQuery = query(
          collection(db, 'messages'),
          where('pairId', '==', pairId),
          orderBy('createdAt', 'desc'),
          limit(1)
        );

        const recipientData = await fetchRecentChatsData(pairId, currentUserId);
        const messagesSnapshot = await getDocs(messagesQuery);
        if (!messagesSnapshot.empty) {
          const data = messagesSnapshot.docs[0].data();
          chats.push({
            id: messagesSnapshot.docs[0].id,
            name: `${recipientData.firstName} ${recipientData.lastName}`,
            avatar: recipientData.avatar,
            pairId: data.pairId,
            lastMessage: data.text,
            timestamp: data.createdAt.toDate(),
          });
        }
      }
      setRecentChats(chats);
      setAreChatsLoading(false);
    };

    const messagesQuery = query(collection(db, 'messages'));
    onSnapshot(messagesQuery, updateRecentChats);
  }, [currentUserId]);

  let chatsStatus;
  if (areChatsLoading) {
    chatsStatus = (
      <Box mt={10}>
        {' '}
        <BimbeerSpinner />
      </Box>
    );
  } else if (recentChats.length === 0) {
    chatsStatus = (
      <Center>
        <Stack w="70%">
          <InfoCard
            text="It's empty here! Match with the others and start chatting."
            beerStatus={sadBeer}
          />
        </Stack>
      </Center>
    );
  }

  return (
    <Box
      p={4}
      maxW="400px"
      minW="330px"
      w="30vw"
      h="60vh"
      overflow="hidden"
      bg="#242526"
      rounded="1rem"
      borderColor="yellow.500"
      borderWidth={1}
      overflowY="auto"
    >
      <Flex
        height="57px"
        mb={-14}
        pb={2}
        direction="row"
        align="center"
        borderBottom="1px solid grey"
      >
        <Center>
          <Text fontSize={26} fontWeight={900}>
            {' '}
            Recent Chats
          </Text>
        </Center>
      </Flex>
      <List spacing={2} mx={4} mt={16}>
        {recentChats.map((chat) => (
          <Link to={`/messages/${chat.pairId}`}>
            <ListItem
              key={chat.id}
              mx={-2}
              mb={2}
              p={4}
              rounded="1rem"
              _hover={{ bg: 'yellow.500' }}
              boxShadow="0px 5px 5px -5px rgba(0,0,0,0.75)"
              bg="#484848"
              overflowWrap="break-word"
            >
              <Flex align="center" justifyContent="space-between">
                <Flex align="center">
                  <Avatar bg="#d69e2e" src={chat.avatar} size="md" mr={4} />
                  <Flex direction="column">
                    <Text fontWeight="bold">{chat.name}</Text>
                    <Flex>
                      <Text fontSize="sm" isTruncated maxW="140px">
                        {chat.lastMessage}
                      </Text>
                      <TimeSinceLastMessage timestamp={chat.timestamp} />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </ListItem>
          </Link>
        ))}
      </List>
      {chatsStatus}
    </Box>
  );
}
