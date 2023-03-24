import * as React from 'react';
import { Box, Flex, Text, Input, IconButton } from '@chakra-ui/react';
import Sidebar from 'renderer/components/Sidebar';
import { AiOutlineSend } from 'react-icons/ai';

const messages = [
  { sender: 'user1', content: 'Hi there!' },
  { sender: 'user2', content: 'Hello!' },
  { sender: 'user1', content: 'How are you?' },
  { sender: 'user2', content: "I'm good, thanks for asking. How about you?" },
];

function Messages() {
  const [inputValue, setInputValue] = React.useState('');

  const handleSendMessage = () => {
    // TODO: implement sending message
    setInputValue('');
  };

  return (
    <>
      <Sidebar />
      <Flex align="center" justify="center" w="100%" minH="100vh">
        <Box
          p={4}
          h="60vh"
          borderColor="yellow.500"
          borderWidth={2}
          rounded="1rem"
          bg="gray.800"
        >
          <Flex direction="column" align="center" h="full">
            <Flex direction="column" align="center" flex={1}>
              {messages.map((message) => (
                <Box
                  key={message.content}
                  mb={2}
                  bg={message.sender === 'user1' ? 'yellow.500' : 'gray.300'}
                  color={message.sender === 'user1' ? 'white' : 'black'}
                  p={2}
                  borderRadius="lg"
                  maxW="60%"
                  alignSelf={
                    message.sender === 'user2' ? 'flex-end' : 'flex-start'
                  }
                >
                  <Text>{message.content}</Text>
                </Box>
              ))}
            </Flex>
            <Flex w="full" position="relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
              />
              <IconButton
                aria-label="Send message"
                icon={<AiOutlineSend />}
                onClick={handleSendMessage}
                position="absolute"
                bg="transparent"
                right={0}
                top={0}
                _hover={{
                  bg: 'yellow.500',
                }}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
export default Messages;
