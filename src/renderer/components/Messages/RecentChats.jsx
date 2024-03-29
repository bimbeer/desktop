import { Box, Avatar, Text, Center, Flex, Stack } from '@chakra-ui/react';
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
import { Link, useLocation } from 'react-router-dom';

import { db, auth } from 'renderer/firebase/firebase';
import { fetchRecentChatsData } from 'renderer/services/messages';
import sadBeer from 'renderer/assets/images/sadBeer.png';
import InfoCard from '../InfoCard';
import BimbeerSpinner from '../BimbeerSpinner';
import TimeSinceLastMessage from './TimeSinceLastMessage';

export default function RecentChats() {
  const [recentChats, setRecentChats] = useState([]);
  const [areChatsLoading, setAreChatsLoading] = useState(true);
  const currentLocation = useLocation();
  const currentUserId = auth.currentUser.uid;
  let chatsStatus;

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
      await pairIds.reduce(async (previousPromise, pairId) => {
        await previousPromise;

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
      }, Promise.resolve());
      setRecentChats(chats);
      setAreChatsLoading(false);
    };

    const messagesQuery = query(collection(db, 'messages'));
    onSnapshot(messagesQuery, updateRecentChats);
  }, [currentUserId]);

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
    <Flex align="center" justify="center" minH="100vh">
      <Box
        p={4}
        maxW="400px"
        minW="330px"
        w="30vw"
        h="60vh"
        bg="#242526"
        rounded="1rem"
        borderColor="yellow.500"
        borderWidth={1}
      >
        <Flex
          direction="row"
          align="center"
          height="57px"
          mb={-14}
          pb={2}
          borderBottom="1px solid grey"
        >
          <Text fontSize={26} fontWeight={900}>
            {' '}
            Recent Chats
          </Text>
        </Flex>
        <Flex direction="column" align="center" h="full">
          <Flex
            mt={16}
            direction="column"
            align="center"
            w="full"
            minW="240px"
            flex={1}
            pr="15px"
            mr="-5px"
            overflowY="auto"
            overflowX="hidden"
            gap={2}
          >
            {recentChats.map((chat) => (
              <Link to={`/messages/${chat.pairId}`}>
                <Flex
                  mr={-3}
                  p={6}
                  w="26vw"
                  minW="288px"
                  maxW="360px"
                  key={chat.index}
                  rounded="1rem"
                  _hover={{
                    bg:
                      currentLocation.pathname === `/messages/${chat.pairId}`
                        ? '#ab7e24'
                        : 'yellow.500',
                  }}
                  boxShadow="0px 5px 5px -5px rgba(0,0,0,0.75)"
                  bg={
                    currentLocation.pathname === `/messages/${chat.pairId}`
                      ? 'yellow.500'
                      : '#484848'
                  }
                >
                  <Avatar
                    maxH={40}
                    maxW={40}
                    rounded="2rem"
                    bg="#d69e2e"
                    src={chat.avatar}
                    mr={4}
                  />
                  <Box borderRadius="lg" rounded="1rem">
                    <Flex direction="column">
                      <Text fontWeight="bold">{chat.name}</Text>
                      <Flex>
                        <Text fontSize="sm" isTruncated maxW="140px">
                          {chat.lastMessage}
                        </Text>
                        <TimeSinceLastMessage timestamp={chat.timestamp} />
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Link>
            ))}
            <Box w="400px" mr="-10px" mt="3vh">
              {chatsStatus}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
