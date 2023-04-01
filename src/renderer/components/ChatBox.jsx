import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  Image,
  FormControl,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { AiOutlineSend, AiFillCheckCircle } from 'react-icons/ai';
import { db, auth } from 'renderer/firebase/firebase';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = React.useState('');
  const [recipientAvatar, setRecipientAvatar] = useState(null);
  const scrollToLastMessage = useRef(null);
  const senderId = auth.currentUser.uid;

  const handleSendMessage = async () => {
    const profileDocRef = doc(db, 'profile', senderId);
    const profileDocSnap = await getDoc(profileDocRef);
    const profileData = profileDocSnap.data();
    const { avatar } = profileData;
    await addDoc(collection(db, 'messages'), {
      text: message,
      avatar,
      createdAt: serverTimestamp(),
      uid: senderId,
      status: 'sent',
    });
    setMessage('');
  };

  const handleReadMessage = async (messageId) => {
    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, {
      status: 'read',
    });
  };

  useLayoutEffect(() => {
    if (scrollToLastMessage.current) {
      scrollToLastMessage.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.uid !== senderId) {
        handleReadMessage(lastMessage.id);
      }
    }
  }, [messages, senderId]);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const newMessages = [];
      QuerySnapshot.forEach((document) => {
        const data = document.data();
        if (data.uid !== senderId) {
          setRecipientAvatar(data.avatar);
        }
        newMessages.push({ ...data, id: document.id });
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [senderId]);

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      marginLeft="100px"
      marginRight="20px"
    >
      <Box
        p={4}
        w="50vw"
        h="60vh"
        borderColor="yellow.500"
        borderWidth={2}
        rounded="1rem"
        bg="gray.800"
      >
        <Flex direction="column" align="center" h="full">
          <Flex
            direction="column"
            align="center"
            w="full"
            flex={1}
            overflowY="auto"
          >
            {messages.map((chat, index) => (
              <Flex
                key={chat.text}
                mb={2}
                alignSelf={chat.uid === senderId ? 'flex-end' : 'flex-start'}
              >
                {chat.uid !== senderId && (
                  <Image
                    maxH={10}
                    maxW={10}
                    rounded="2rem"
                    src={chat.avatar}
                    mr={2}
                  />
                )}
                <Box
                  bg={chat.uid === senderId ? 'yellow.500' : 'gray.300'}
                  color={chat.uid === senderId ? 'white' : 'black'}
                  p={2}
                  borderRadius="lg"
                  mr={2}
                  rounded="1rem"
                  position="relative"
                >
                  <Text>{chat.text}</Text>
                  <div ref={scrollToLastMessage} />
                  {chat.uid === senderId &&
                    chat.status === 'sent' &&
                    index === messages.length - 1 && (
                      <AiFillCheckCircle
                        style={{
                          position: 'absolute',
                          bottom: '-16px',
                          right: '1px',
                        }}
                      />
                    )}
                  {chat.uid === senderId &&
                    chat.status === 'read' &&
                    index === messages.length - 1 && (
                      <Image
                        maxH="14px"
                        maxW="14px"
                        rounded="full"
                        src={recipientAvatar}
                        position="absolute"
                        bottom="-16px"
                        right="1px"
                      />
                    )}
                </Box>
              </Flex>
            ))}
          </Flex>
          <Flex w="full" position="relative">
            <FormControl
              as="form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.trim()) {
                  return;
                }
                handleSendMessage();
              }}
            >
              <InputGroup>
                <Input
                  mt={-4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  _placeholder={{ color: 'gray' }}
                  placeholder="Type a message..."
                />
                {message && (
                  <InputRightElement>
                    <IconButton
                      mt={-8}
                      aria-label="Send chat"
                      icon={<AiOutlineSend />}
                      type="submit"
                      bg="transparent"
                      _hover={{
                        bg: 'yellow.500',
                      }}
                    />
                  </InputRightElement>
                )}
              </InputGroup>
            </FormControl>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
