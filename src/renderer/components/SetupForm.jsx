import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  RadioGroup,
  Radio,
  Textarea,
  useTheme,
  Image,
  Grid,
} from '@chakra-ui/react';

import beerList from './BeerList';

export default function SetupForm() {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [about, setAbout] = useState('');
  const [gender, setGender] = useState('');
  const [interest, setInterest] = useState('');
  const [selectedBeers, setSelectedBeers] = useState([]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleSelectBeer = (index) => {
    const beer = beerList[index];
    setSelectedBeers((prevSelectedBeers) => {
      if (prevSelectedBeers.includes(beer)) {
        return prevSelectedBeers.filter(
          // eslint-disable-next-line no-shadow
          (selectedBeers) => selectedBeers !== beer
        );
      }
      return [...prevSelectedBeers, beer];
    });
  };

  const handleSubmit = () => {
    console.log({
      firstName,
      lastName,
      username,
      age,
      about,
      gender,
      interest,
      selectedBeers,
    });
  };

  const setupFormUserInfo = () => (
    <Stack spacing={8} mx="auto" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Setup your account
        </Heading>
      </Stack>
      <Box rounded="lg" bg={theme.palette.secondary} boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <HStack spacing={4}>
            <Box>
              <FormControl w="sm" id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl w="sm" id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="text">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="text">
            <FormLabel>Age</FormLabel>
            <InputGroup>
              <Input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>About me</FormLabel>
            <Textarea
              _placeholder={{ color: 'white' }}
              borderColor="gray"
              placeholder="Say something about yourself."
              size="sm"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </FormControl>
          <FormControl as="fieldset">
            <FormLabel as="legend">Gender</FormLabel>
            <RadioGroup value={gender} onChange={(e) => setGender(e)}>
              <HStack spacing="24px">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl as="fieldset">
            <FormLabel as="legend">Show me</FormLabel>
            <RadioGroup value={interest} onChange={(e) => setInterest(e)}>
              <HStack spacing="24px">
                <Radio value="man">Man</Radio>
                <Radio value="woman">Woman</Radio>
                <Radio value="both">Both</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              bg={theme.palette.accent}
              color="black"
              size="lg"
              onClick={handleNextStep}
              _hover={{
                bg: 'yellow.500',
              }}
            >
              Proceed
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );

  const setupFormFavBeerInfo = () => (
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
                key={index}
                cursor="pointer"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                onClick={() => handleSelectBeer(index)}
                bg={selectedBeers.includes(beer) ? theme.palette.accent : ''}
              >
                <Image
                  maxW="100px"
                  maxH="100px"
                  src={beer.link}
                  alt={beer.name}
                />
                {/* <Box p={4} bg={theme.palette.primary}>
                <Heading size="md" color="white">
                  {beer.name}
                </Heading>
              </Box> */}
              </Box>
            ))}
          </Grid>
          <HStack mt={8} justify="space-between">
            <Button bg="gray.700" onClick={handleBackStep}>
              Back
            </Button>
            <Button
              bg={theme.palette.accent}
              onClick={handleSubmit}
              disabled={selectedBeers.length === 0}
              color="black"
            >
              Submit
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <Flex minHeight="100vh" justify="center" align="center">
      <Box maxW="4xl" w="full">
        {step === 1 && setupFormUserInfo()}
        {step === 2 && setupFormFavBeerInfo()}
      </Box>
    </Flex>
  );
}
