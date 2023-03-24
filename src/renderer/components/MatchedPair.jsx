import React from 'react';
import { Box, Image, Text, Flex, IconButton } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

function MatchedPair({ pair }) {
  return (
    <Flex
      maxW="sm"
      borderWidth="2px"
      borderColor="yellow.500"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bgColor="gray.800"
    >
      <Image src={pair.image} alt={pair.name} w={24} h={24} objectFit="cover" />
      <Box p="6" flex="1">
        <Text fontWeight="bold">{pair.name}</Text>
        <Text>@{pair.username}</Text>
      </Box>
      <Flex alignItems="center">
        <IconButton
          mr={2}
          aria-label="Decline"
          icon={<FaTimes />}
          onClick={() => console.log('decline clicked')}
          fontSize="20px"
          boxSize="40px"
          bg="transparent"
          color="red.300"
          borderColor="red.300"
          borderWidth={2}
          colorScheme="red"
          rounded="2rem"
        />
      </Flex>
    </Flex>
  );
}

export default MatchedPair;
