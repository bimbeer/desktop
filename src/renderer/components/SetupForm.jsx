/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
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
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Text,
  VStack,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from 'renderer/context/AuthContext';
import { setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase/firebase';
import beerList from './BeerList';

export default function SetupForm() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = React.useState();
  const [selectedFile, setSelectedFile] = useState();
  const fileInputRef = React.useRef();
  const theme = useTheme();
  const userId = getUserFromLocalStorage();
  const [step, setStep] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    about: '',
    gender: '',
    interest: '',
    location: '',
    range: 50,
    isGlobal: false,
    isLocal: false,
    selectedBeers: [],
  });

  function handleUploadClick() {
    fileInputRef.current.click();
  }

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

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

  async function handleAvatarChange(event) {
    const avatar = event.target.files[0];
    if (avatar) {
      setSelectedFile(avatar);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(avatar);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFormSubmitting(true);
    let downloadURL;
    if (selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${userId}`);
      await uploadBytes(storageRef, selectedFile);
      downloadURL = await getDownloadURL(storageRef);
    }
    const userDocRef = doc(db, 'profile', userId);
    await setDoc(userDocRef, {
      ...profile,
      avatar: downloadURL,
    });
    navigate('/profile');
  };

  useEffect(() => {
    const isFormValid = () => {
      return (
        profile.firstName &&
        profile.username &&
        profile.age &&
        profile.about &&
        profile.gender &&
        profile.interest
      );
    };
    setIsValid(isFormValid());
  }, [
    profile.firstName,
    profile.username,
    profile.age,
    profile.about,
    profile.gender,
    profile.interest,
  ]);

  const profileInfoForm = () => (
    <Stack spacing={8} mx="auto" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Setup your profile infomation
        </Heading>
      </Stack>
      <Box rounded="lg" bg={theme.palette.secondary} boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <HStack spacing={4}>
            <FormControl isRequired w="sm" id="text">
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    firstName: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl isRequired w="sm" id="text">
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    lastName: e.target.value,
                  }))
                }
              />
            </FormControl>
          </HStack>
          <FormControl isRequired id="text">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={profile.username}
              onChange={(e) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  username: e.target.value,
                }))
              }
            />
          </FormControl>
          <HStack>
            <FormControl isRequired id="number">
              <FormLabel>Age</FormLabel>
              <NumberInput
                min={18}
                max={120}
                onChange={(value) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    age: value,
                  }))
                }
                borderColor="gray"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper color="gray" />
                  <NumberDecrementStepper color="gray" size="sm" />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired id="avatar">
              <VisuallyHidden>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                />
              </VisuallyHidden>
              <Flex gap={100} alignItems="center">
                <VStack pl={5}>
                  <FormLabel>Avatar</FormLabel>
                  <Button
                    size="sm"
                    bg={theme.palette.accent}
                    color="black"
                    _hover={{
                      bg: 'yellow.500',
                    }}
                    onClick={handleUploadClick}
                  >
                    {'Uploaded!' || 'Choose File'}
                  </Button>
                </VStack>
                {avatarPreview && (
                  <Image
                    src={avatarPreview}
                    alt="Avatar preview"
                    boxSize="70px"
                    objectFit="cover"
                    borderRadius="full"
                  />
                )}
              </Flex>
            </FormControl>
          </HStack>
          <FormControl isRequired>
            <FormLabel>About me</FormLabel>
            <Textarea
              _placeholder={{ color: 'gray' }}
              borderColor="gray"
              placeholder="Say something about yourself."
              size="sm"
              onChange={(e) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  about: e.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl isRequired as="fieldset">
            <FormLabel as="legend">Gender</FormLabel>
            <RadioGroup
              value={profile.gender}
              onChange={(e) =>
                setProfile((prevProfile) => ({ ...prevProfile, gender: e }))
              }
            >
              <HStack spacing="24px">
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired as="fieldset">
            <FormLabel as="legend">Show me</FormLabel>
            <RadioGroup
              value={profile.interest}
              onChange={(e) =>
                setProfile((prevProfile) => ({ ...prevProfile, interest: e }))
              }
            >
              <HStack spacing="24px">
                <Radio value="Man">Man</Radio>
                <Radio value="Woman">Woman</Radio>
                <Radio value="Both">Both</Radio>
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

  const profileDiscoverySettingsForm = () => (
    <Stack spacing={8} mx="auto" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Setup your discovery settings
        </Heading>
      </Stack>
      <Box rounded="lg" bg={theme.palette.secondary} boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <FormControl isRequired id="text">
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              onChange={(e) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  location: e.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel mb={8}>Range setting</FormLabel>
            <Slider
              defaultValue={50}
              aria-label="slider-ex-6"
              onChange={(val) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  range: val,
                }))
              }
            >
              <SliderMark
                value={profile.range}
                textAlign="center"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {profile.range}km
              </SliderMark>
              <SliderTrack bg="yellow.800">
                <SliderFilledTrack bg="yellow.500" />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl>
            <Flex align="center" mb="20px">
              <Switch
                isRequired
                colorScheme="yellow"
                me="10px"
                value={profile.isGlobal}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    isGlobal: e.target.checked,
                  }))
                }
              />
              <Text noOfLines={1} fontSize="md" fontWeight="400">
                Global
              </Text>
            </Flex>
            <Flex align="center" mb="20px">
              <Switch
                isRequired
                colorScheme="yellow"
                me="10px"
                value={profile.isLocal}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    isLocal: e.target.checked,
                  }))
                }
              />
              <Text noOfLines={1} fontSize="md" fontWeight="400">
                Only show people in this range
              </Text>
            </Flex>
          </FormControl>
          <Stack mt={8} justify="space-between">
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

  const profileFavBeerForm = () => (
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

  return (
    <Flex minHeight="100vh" justify="center" align="center">
      <Box maxW="4xl" w="full">
        {step === 1 && profileInfoForm()}
        {step === 2 && profileDiscoverySettingsForm()}
        {step === 3 && profileFavBeerForm()}
      </Box>
    </Flex>
  );
}
