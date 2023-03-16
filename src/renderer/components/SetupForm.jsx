import { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
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
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
  const [isValid, setIsValid] = useState(false);

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
          (selectedBeer) => selectedBeer !== beer
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

  useEffect(() => {
    const isFormValid = () => {
      return firstName && username && age && about && gender && interest;
    };
    setIsValid(isFormValid());
  }, [firstName, username, age, about, gender, interest]);

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
              <FormControl isRequired w="sm" id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired w="sm" id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl isRequired id="text">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired id="number">
            <FormLabel>Age</FormLabel>
            <NumberInput
              min={18}
              value={age}
              onChange={(valueString) => setAge(parseInt(valueString, 10))}
              borderColor="gray"
            >
              <NumberInputField type="number" />
              <NumberInputStepper>
                <NumberIncrementStepper color="gray" />
                <NumberDecrementStepper color="gray" size="sm" />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
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
          <FormControl isRequired as="fieldset">
            <FormLabel as="legend">Gender</FormLabel>
            <RadioGroup value={gender} onChange={(e) => setGender(e)}>
              <HStack spacing="24px">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired as="fieldset">
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
              isDisabled={!isValid}
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
                key={index.id}
                cursor="pointer"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                onClick={() => handleSelectBeer(index)}
                bg={selectedBeers.includes(beer) ? theme.palette.accent : ''}
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
                {/* <Box p={4} bg={theme.palette.primary}>
                <Heading size="md" color="white">
                  {beer.name}
                </Heading>
              </Box> */}
              </Box>
            ))}
          </Grid>
          <Stack mt={8} justify="space-between">
            <Button
              bg={theme.palette.accent}
              onClick={handleSubmit}
              isDisabled={selectedBeers.length === 0}
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

  return (
    <Flex minHeight="100vh" justify="center" align="center">
      <Box maxW="4xl" w="full">
        {step === 1 && setupFormUserInfo()}
        {step === 2 && setupFormFavBeerInfo()}
      </Box>
    </Flex>
  );
}
