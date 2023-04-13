import React, { useState, useEffect } from 'react';
import { Center, Box, Heading, SimpleGrid, Spinner } from '@chakra-ui/react';

import { getMatches, unpairUsers } from 'renderer/services/interactions';
import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import MatchedUsers from 'renderer/components/Matches/MatchedUsers';
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

  return (
    <>
      <Sidebar />
      <Center>
        <Box p={6} h="100vh" ml="100px" mr="20px">
          <Center>
            <Heading mt={4} mb={8}>
              Drinking buddies
            </Heading>
          </Center>
          {areMatchesLoading ? (
            <Center h="10vh">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.700"
                color="yellow.500"
                size="xl"
              />
            </Center>
          ) : (
            <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={10}>
              {matches.map((match) => (
                <MatchedUsers
                  key={match.recipient}
                  pairData={match.userData}
                  pairId={match.pairId}
                  handleUnpair={() =>
                    handleUnpair(currentUserId, match.recipient)
                  }
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Center>
    </>
  );
}
