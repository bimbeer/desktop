import React, { useEffect, useState } from 'react';
import BimbeerCard from 'renderer/components/Dashboard/BimbeerCard.jsx';
import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import {
  Center,
  Spinner,
  Text,
  Flex,
  Card,
  useToast,
  Box,
  Heading,
} from '@chakra-ui/react';
import { addPairs, checkForMatch } from 'renderer/services/interactions';
import {
  getUserData,
  getUsersWithMatchingBeersAndInterests,
} from '../services/profiles';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isCardLoading, setIsCardLoading] = useState(true);
  const [noMoreSuggestions, setNoMoreSuggestions] = useState(false);
  const currentUserId = getUserFromLocalStorage();
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      setIsCardLoading(true);
      const data = await getUserData(currentUserId);

      if (data) {
        const matchedUsers = await getUsersWithMatchingBeersAndInterests(
          currentUserId,
          data
        );
        setUsers(matchedUsers);
        setIsCardLoading(false);
      }
    }
    fetchData();
  }, [currentUserId]);

  const handleUserAction = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex((prevIndex) => prevIndex + 1);
    } else {
      setNoMoreSuggestions(true);
    }
  };

  const handleLike = async () => {
    addPairs(currentUserId, users[currentUserIndex].id, 'like');

    const isMatch = await checkForMatch(
      currentUserId,
      users[currentUserIndex].id
    );
    if (isMatch) {
      toast({
        duration: 3000,
        position: 'top-right',
        isClosable: true,
        render: () => (
          <Box
            color="white"
            py={3}
            p={3}
            mt={2}
            bg="gray.700"
            borderLeft="4px"
            borderColor="yellow.500"
          >
            <Heading as="h4" size="sm" mb={1}>
              Match!
            </Heading>
            You have matched with {users[currentUserIndex].firstName}!
          </Box>
        ),
      });
    }

    handleUserAction();
  };

  const handleDislike = () => {
    addPairs(currentUserId, users[currentUserIndex].id, 'dislike');
    handleUserAction();
  };

  const renderContent = () => {
    if (isCardLoading) {
      return (
        <Center h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.700"
            color="yellow.500"
            size="xl"
          />
        </Center>
      );
    }
    if (noMoreSuggestions) {
      return (
        <Flex minH="100vh" align="center" justify="center" ml="100px" mr="20px">
          <Card p={10} bg="whiteAlpha.100" maxW={550}>
            <Center>
              <Text color="white">
                You have swiped through all possible suggestions, consider
                enabling global search or wait for new people!
              </Text>
            </Center>
          </Card>
        </Flex>
      );
    }
    if (users.length > 0) {
      return (
        <BimbeerCard
          key={users[currentUserIndex].username}
          user={users[currentUserIndex]}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      );
    }
    return (
      <Flex
        display={isCardLoading ? 'none' : 'flex'}
        minH="100vh"
        align="center"
        justify="center"
        ml="100px"
        mr="20px"
      >
        <Card p={10} bg="whiteAlpha.100" maxW={650}>
          <Center>
            <Text color="white">
              It seems like we have no suggestions ready for you at the moment,
              consider enabling global search or wait for new people!
            </Text>
          </Center>
        </Card>
      </Flex>
    );
  };

  return (
    <>
      <Sidebar />
      {renderContent()}
    </>
  );
}
