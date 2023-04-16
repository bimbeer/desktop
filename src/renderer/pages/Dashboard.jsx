import React, { useEffect, useState, useCallback } from 'react';
import { Center, Flex, useToast, Box, Heading } from '@chakra-ui/react';

import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import {
  addPairs,
  checkForMatch,
  getInteractedUsers,
} from 'renderer/services/interactions';
import BimbeerSpinner from 'renderer/components/BimbeerSpinner';
import InfoCard from 'renderer/components/InfoCard';
import happyBeer from 'renderer/assets/images/happyBeer.png';
import sadBeer from 'renderer/assets/images/sadBeer.png';
import {
  getUserData,
  getUsersWithMatchingBeers,
  getUsersWithMatchingInterests,
} from '../services/profiles';
import BimbeerCard from '../components/Dashboard/BimbeerCard';
import CardButtons from '../components/Dashboard/BimbeerCardButtons';
import Sidebar from '../components/Sidebar';

const ACTION_DELAY_DURATION = 500;

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isCardLoading, setIsCardLoading] = useState(true);
  const [noMoreSuggestions, setNoMoreSuggestions] = useState(false);
  const [isActionButtonDisabled, setIsActionButtonDisabled] = useState(false);
  const [hideActionButtons, setHideActionButtons] = useState(false);
  const [cardTransform, setCardTransform] = useState('');
  const currentUserId = getUserFromLocalStorage();
  const toast = useToast();

  useEffect(() => {
    document.body.classList.add('hide-overflow');

    return () => {
      document.body.classList.remove('hide-overflow');
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsCardLoading(true);
      const data = await getUserData(currentUserId);

      if (data) {
        let matchedUsers = await getUsersWithMatchingBeers(currentUserId, data);
        matchedUsers = getUsersWithMatchingInterests(
          currentUserId,
          data,
          matchedUsers
        );

        const usersToExclude = await getInteractedUsers(currentUserId);

        matchedUsers = matchedUsers.filter(
          (user) => !usersToExclude.includes(user.id)
        );

        setUsers(matchedUsers);
        setIsCardLoading(false);
      }
    }
    fetchData();
  }, [currentUserId]);

  const handleUserAction = useCallback(() => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex((prevIndex) => prevIndex + 1);
      setCardTransform('');
    } else {
      setNoMoreSuggestions(true);
    }
  }, [currentUserIndex, users.length]);

  const handleLike = useCallback(async () => {
    if (!(currentUserIndex < users.length - 1)) {
      setHideActionButtons(true);
    }
    if (!isActionButtonDisabled) {
      setCardTransform('translateX(150%) rotate(-30deg');

      if (users[currentUserIndex]) {
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
        setTimeout(() => {
          handleUserAction();
          setIsActionButtonDisabled(false);
        }, ACTION_DELAY_DURATION);
      }
    }
  }, [
    isActionButtonDisabled,
    users,
    currentUserIndex,
    currentUserId,
    toast,
    handleUserAction,
  ]);

  const handleDislike = useCallback(() => {
    if (!(currentUserIndex < users.length - 1)) {
      setHideActionButtons(true);
    }

    if (!isActionButtonDisabled) {
      setIsActionButtonDisabled(true);
      setCardTransform('translateX(-150%) rotate(30deg');

      if (users[currentUserIndex]) {
        addPairs(currentUserId, users[currentUserIndex].id, 'dislike');
        setTimeout(() => {
          handleUserAction();
          setIsActionButtonDisabled(false);
        }, ACTION_DELAY_DURATION);
      }
    }
  }, [
    isActionButtonDisabled,
    users,
    currentUserIndex,
    currentUserId,
    handleUserAction,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleLike();
      } else if (event.key === 'ArrowLeft') {
        handleDislike();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDislike, handleLike]);

  const renderContent = () => {
    if (isCardLoading) {
      return (
        <Center ml={20} h="100vh">
          <BimbeerSpinner />
        </Center>
      );
    }

    if (noMoreSuggestions) {
      return (
        <Flex
          w="100vw"
          h="350px"
          align="center"
          justify="center"
          bg="whiteAlpha.100"
          mt="275px"
          pl="100px"
          pr="35px"
        >
          <InfoCard
            heading="Woah, that was quick!"
            text="You have swiped through all possible suggestions.
              We hope to get you more as fast as possible!"
            beerStatus={happyBeer}
          />
        </Flex>
      );
    }

    if (users.length > 0) {
      const remainingCards = users.slice(currentUserIndex);
      return (
        <>
          <Flex justify="center" width="100vw" minH="100vh" bg="#141517">
            {remainingCards.map((user, index) => (
              <BimbeerCard
                key={user.username}
                user={user}
                handleLike={handleLike}
                handleDislike={handleDislike}
                style={{
                  zIndex: remainingCards.length - index,
                  position: 'absolute',
                  width: '76vw',
                  transition:
                    'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                  transform: index === 0 ? cardTransform : '',
                  opacity: index === 0 && cardTransform ? 0 : 1,
                }}
              />
            ))}
          </Flex>
          {!hideActionButtons ? (
            <CardButtons
              handleLike={handleLike}
              handleDislike={handleDislike}
            />
          ) : null}
        </>
      );
    }

    return (
      <Flex
        display={isCardLoading ? 'none' : 'flex'}
        w="100vw"
        h="350px"
        align="center"
        justify="center"
        bg="whiteAlpha.100"
        mt="275px"
        pl="100px"
        pr="35px"
      >
        <InfoCard
          heading="No suggestions *◠*"
          text="It seems like we have no suggestions ready for you at the moment,
            consider enabling global search or wait for new people!"
          beerStatus={sadBeer}
        />
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
