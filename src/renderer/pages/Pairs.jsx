import React from 'react';
import { Box, Heading, SimpleGrid, Center } from '@chakra-ui/react';
import Sidebar from 'renderer/components/Sidebar';
import MatchedPair from '../components/MatchedPair';

function MatchedPairsPage({}) {
  const matchedPairs = [
    {
      id: 1,
      name: 'Mietek Robercik',
      username: 'mierecik21',
      image:
        'https://i0.wp.com/mississippitoday.org/wp-content/uploads/2017/01/22305696820_b02d741008_k.jpg?ssl=1',
    },
    {
      id: 2,
      name: 'Dżesika',
      username: 'żesiczka23',
      image:
        'https://i0.wp.com/mississippitoday.org/wp-content/uploads/2017/01/22305696820_b02d741008_k.jpg?ssl=1',
    },
    {
      id: 3,
      name: 'Dżesika',
      username: 'żesiczka23',
      image:
        'https://i0.wp.com/mississippitoday.org/wp-content/uploads/2017/01/22305696820_b02d741008_k.jpg?ssl=1',
    },
    {
      id: 4,
      name: 'Dżesika',
      username: 'żesiczka23',
      image:
        'https://i0.wp.com/mississippitoday.org/wp-content/uploads/2017/01/22305696820_b02d741008_k.jpg?ssl=1',
    },
    {
      id: 5,
      name: 'Dżesika',
      username: 'żesiczka23',
      image:
        'https://i0.wp.com/mississippitoday.org/wp-content/uploads/2017/01/22305696820_b02d741008_k.jpg?ssl=1',
    },
  ];

  return (
    <>
      <Sidebar />
      <Center>
        <Box p={6} minH="100vh">
        <Center>
          <Heading mb={8}>Matched Pairs</Heading>
          </Center>
          <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={10}>
            {matchedPairs.map((pair) => (
              <MatchedPair key={pair.id} pair={pair} />
            ))}
          </SimpleGrid>
        </Box>
        </Center>
    </>
  );
}

export default MatchedPairsPage;
