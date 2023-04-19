import React, { useState, useEffect } from 'react';
import { Center, Box, Heading, SimpleGrid, Flex } from '@chakra-ui/react';

import { getMatches, unpairUsers } from 'renderer/services/interactions';
import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import InfoCard from 'renderer/components/InfoCard';
import MatchedUsers from 'renderer/components/Matches/MatchedUsers';
import BimbeerSpinner from 'renderer/components/BimbeerSpinner';
import sadBeer from 'renderer/assets/images/sadBeer.png';
import Sidebar from '../components/Sidebar';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [areMatchesLoading, setAreMatchesLoading] = useState(true);
  const currentUserId = getUserFromLocalStorage();

  useEffect(() => {
    const fetchMatches = async () => {
      const matchesData = await getMatches(currentUserId);
      setMatches(matchesData);
      setAreMatchesLoading(false);
    };
    fetchMatches();
  }, [currentUserId]);

  async function handleUnpair(senderId, recipientId) {
    await unpairUsers(currentUserId, recipientId);

    setMatches((prevMatches) =>
      prevMatches.filter(
        (match) =>
          match.recipient !== currentUserId && match.recipient !== recipientId
      )
    );
  }

  const renderContent = () => {
    if (areMatchesLoading) {
      return (
        <Center ml={20} h="75vh">
          <BimbeerSpinner />
        </Center>
      );
    }

    if (matches.length === 0) {
      return (
        <Flex
          w="100vw"
          h="350px"
          align="center"
          justify="center"
          bg="whiteAlpha.100"
          mt="175px"
          pl="70px"
          pr="35px"
        >
          <InfoCard
            heading="Looks empty *◠*"
            text="Move to dashboard and start searching for them filthy beer lovers!"
            beerStatus={sadBeer}
          />
        </Flex>
      );
    }

    return (
      <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={5}>
        {matches.map((match) => (
          <MatchedUsers
            key={match.recipient}
            pairData={match.userData}
            pairId={match.pairId}
            handleUnpair={() => handleUnpair(currentUserId, match.recipient)}
          />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <>
      <Sidebar />
      <Center>
        <Box p={6} h="100vh" overflow="hidden">
          <Center>
            <Heading mt={4} mb={8}>
              Drinking buddies
            </Heading>
          </Center>
          {renderContent()}
        </Box>
      </Center>
    </>
  );
}
