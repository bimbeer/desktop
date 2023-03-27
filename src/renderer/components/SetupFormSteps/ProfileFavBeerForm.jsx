import React from 'react';
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

export default function ProfileDiscoverySettingsForm({
  profile,
  setProfile,
  handleSubmit,
  handleBackStep,
  isFormSubmitting,
}) {
  const theme = useTheme();

  const handleSelectBeer = (index) => {
    const beer = beerList[index];
    setProfile((prevProfile) => {
      if (prevProfile.selectedBeers.includes(beer)) {
        return {
          ...prevProfile,
          selectedBeers: prevProfile.selectedBeers.filter(
            (selectedBeer) => selectedBeer !== beer
          ),
        };
      }
      return {
        ...prevProfile,
        selectedBeers: [...prevProfile.selectedBeers, beer],
      };
    });
  };

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
                  profile.selectedBeers.includes(beer)
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
              isDisabled={profile.selectedBeers.length === 0}
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
