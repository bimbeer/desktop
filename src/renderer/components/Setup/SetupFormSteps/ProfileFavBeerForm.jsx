import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  Button,
  Heading,
  useTheme,
  HStack,
  Grid,
  Center,
  Image,
} from '@chakra-ui/react';

import beerList from '../BeerList';

export default function ProfileFavBeerForm({
  profile,
  setProfile,
  handleSubmit,
  handleBackStep,
  isFormSubmitting,
  beers,
}) {
  const theme = useTheme();

  const handleSelectBeer = (index) => {
    const beer = beerList[index];
    setProfile((prevProfile) => {
      const selectedIndex = prevProfile.beers.findIndex(
        (selectedBeer) => selectedBeer.name === beer.name
      );

      if (selectedIndex !== -1) {
        return {
          ...prevProfile,
          beers: prevProfile.beers.filter(
            (selectedBeer, i) => i !== selectedIndex
          ),
        };
      }

      return {
        ...prevProfile,
        beers: [...prevProfile.beers, beer],
      };
    });
  };

  useEffect(() => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      beers: beers || [],
    }));
  }, [beers, setProfile]);

  return (
    <Stack spacing={8} mx="auto" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Select your favourite beers
        </Heading>
      </Stack>
      <Box rounded="lg" bg={theme.palette.secondary} boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <HStack spacing={4} />
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {beerList.map((beer, index) => (
              <Box
                key={index.id}
                cursor="pointer"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                onClick={() => handleSelectBeer(index)}
                bg={
                  profile.beers.find(
                    (selectedBeer) => selectedBeer.name === beer.name
                  )
                    ? theme.palette.accent
                    : ''
                }
                maxW="300px"
              >
                <Center>
                  <Image
                    p={2}
                    maxW="100%"
                    maxH="250px"
                    src={beer.link}
                    alt={beer.name}
                  />
                </Center>
              </Box>
            ))}
          </Grid>
          <Stack mt={8} justify="space-between">
            <Button
              bg={theme.palette.accent}
              onClick={handleSubmit}
              isDisabled={profile.beers.length === 0}
              isLoading={isFormSubmitting}
              color="black"
              _hover={{
                bg: 'yellow.500',
              }}
            >
              Submit
            </Button>
            <Button
              bg="gray.700"
              _hover={{
                bg: 'gray',
              }}
              onClick={handleBackStep}
            >
              Back
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

ProfileFavBeerForm.propTypes = {
  profile: PropTypes.shape({
    beers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setProfile: PropTypes.func.isRequired,
  beers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBackStep: PropTypes.func.isRequired,
  isFormSubmitting: PropTypes.bool.isRequired,
};
