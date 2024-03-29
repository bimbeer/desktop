import React from 'react';
import { Flex, Avatar, Box, Text, IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { BsFillChatDotsFill } from 'react-icons/bs';

export default function MatchedUsers({ pairData, pairId, handleUnpair }) {
  return (
    <Flex
      w="60vw"
      maxW="85vh"
      p={4}
      borderWidth="1px"
      borderColor="yellow.500"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="#242526"
    >
      <Avatar
        bg="#d69e2e"
        src={pairData.avatar}
        w={24}
        h={24}
        objectFit="cover"
      />
      <Box p="6" flex="1">
        <Text fontWeight="bold">
          {`${pairData.firstName} ${pairData.lastName}`}
        </Text>
        <Text>@{pairData.username}</Text>
      </Box>
      <Flex alignItems="center">
        <Link to={`/messages/${pairId}`}>
          <IconButton
            mr={4}
            aria-label="Message"
            icon={<BsFillChatDotsFill />}
            fontSize="20px"
            boxSize="40px"
            bg="transparent"
            _hover={{
              bg: 'grey',
              transform: 'scale(1.2)',
            }}
            color="white"
            borderWidth={2}
            borderColor="grey"
            rounded="2rem"
          />
        </Link>
        <IconButton
          mr={4}
          aria-label="Unpair"
          onClick={handleUnpair}
          borderWidth={2}
          icon={<RxCross2 />}
          fontSize="20px"
          boxSize="40px"
          bg="transparent"
          _hover={{
            bg: 'red.800',
            transform: 'scale(1.2)',
          }}
          color="red.300"
          borderColor="red.800"
          rounded="2rem"
        />
      </Flex>
    </Flex>
  );
}

MatchedUsers.propTypes = {
  pairData: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  handleUnpair: PropTypes.func.isRequired,
  pairId: PropTypes.string.isRequired,
};
