import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  Avatar,
  FormControl,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  query,
  collection,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { AiOutlineSend, AiFillCheckCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';

import { db, auth } from 'renderer/firebase/firebase';
import {
  sendMessage,
  handleReadMessage,
  useRecipient,
} from 'renderer/services/messages';

export default function ChatBox({ pairId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = React.useState('');
  const scrollToLastMessage = useRef(null);
  const senderId = auth.currentUser.uid;
  const { recipientData } = useRecipient(pairId, senderId);

  const handleSendMessage = async () => {
    await sendMessage(senderId, message, pairId);
    setMessage('');
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
      where('pairId', '==', pairId),
      orderBy('createdAt'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const newMessages = [];

      QuerySnapshot.forEach((document) => {
        const data = document.data();
        newMessages.push({ ...data, id: document.id });
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [pairId, senderId]);

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Box
        p={4}
        w="50vw"
        h="60vh"
        borderColor="yellow.500"
        borderWidth={1}
        rounded="1rem"
        bg="#242526"
      >
        {recipientData && (
          <Flex
            direction="row"
            align="center"
            height="57px"
            mb={-14}
            pb={2}
            borderBottom="1px solid grey"
          >
            <Avatar bg="#d69e2e" src={recipientData.avatar} />
            <Text ml={2}>
              {recipientData.firstName} {recipientData.lastName}
            </Text>
          </Flex>
        )}
        <Flex direction="column" align="center" h="full">
          <Flex
            mt={16}
            direction="column"
            align="center"
            w="full"
            flex={1}
            overflowY="auto"
          >
            {messages.map((chat, index) => (
              <Flex
                key={chat.index}
                mb={2}
                alignSelf={chat.uid === senderId ? 'flex-end' : 'flex-start'}
              >
                {chat.uid !== senderId && (
                  <Avatar
                    maxH={10}
                    maxW={10}
                    rounded="2rem"
                    bg="#d69e2e"
                    src={recipientData.avatar}
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
                  wordBreak="break-word"
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
                      <Avatar
                        maxH="14px"
                        maxW="14px"
                        rounded="full"
                        bg="#d69e2e"
                        src={recipientData.avatar}
                        position="absolute"
                        bottom="-16px"
                        right="1px"
                      />
                    )}
                </Box>
              </Flex>
            ))}
          </Flex>
          <Flex
            w="full"
            position="relative"
            mt={-4}
            display={!recipientData ? 'none' : 'flex'}
          >
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  _placeholder={{ color: 'gray' }}
                  placeholder={
                    recipientData.username
                      ? `Message @${recipientData.username}`
                      : 'Type a message...'
                  }
                />
                {message && (
                  <InputRightElement>
                    <IconButton
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

ChatBox.propTypes = {
  pairId: PropTypes.string.isRequired,
};
