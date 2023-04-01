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
import Sidebar from 'renderer/components/Sidebar';
import { AiOutlineSend } from 'react-icons/ai';
import { db, auth } from 'renderer/firebase/firebase';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = React.useState('');
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
    });
    setMessage('');
  };

  useLayoutEffect(() => {
    if (scrollToLastMessage.current) {
      scrollToLastMessage.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const newMessages = [];
      QuerySnapshot.forEach((document) => {
        newMessages.push({ ...document.data(), id: document.id });
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Sidebar />
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
              {messages.map((chat) => (
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
                  >
                    <Text>{chat.text}</Text>
                    <div ref={scrollToLastMessage} />
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
    </>
  );
}
export default Messages;
