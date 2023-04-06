import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VisuallyHidden,
  Flex,
  VStack,
  Button,
  Image,
  Textarea,
  RadioGroup,
  Radio,
  FormErrorMessage,
  FormErrorIcon,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from 'renderer/firebase/firebase';
import {
  validateTextOnly,
  validateTextAndNumbersOnly,
  validateMaxLength,
  validateFileType,
  validateNotOnlyNumbers,
  validateNumbersOnly,
} from 'renderer/helpers/validators';
import {
  capitalizeFirstLetter,
  convertToLowercase,
} from 'renderer/helpers/normalizer';

export default function ProfileInfoForm({
  profile,
  setProfile,
  avatarPreview,
  selectedFile,
  setSelectedFile,
  handleNextStep,
}) {
  const theme = useTheme();
  const fileInputRef = React.useRef();
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: [],
    age: '',
    description: '',
    avatar: '',
  });
  const [avatarPreviewState, setAvatarPreviewState] =
    React.useState(avatarPreview);

  useEffect(() => {
    setAvatarPreviewState(avatarPreview);
  }, [avatarPreview]);

  useEffect(() => {
    const isFormValid = () => {
      return (
        profile.firstName &&
        profile.username &&
        profile.age &&
        profile.description &&
        profile.gender &&
        profile.interest &&
        (selectedFile || avatarPreview) &&
        !Object.values(errors).some((error) => error.length > 0)
      );
    };
    setIsValid(isFormValid());
  }, [
    profile.firstName,
    profile.username,
    profile.age,
    profile.description,
    profile.gender,
    profile.interest,
    selectedFile,
    avatarPreview,
    errors,
  ]);

  function handleFirstNameChange(event) {
    const { value } = event.target;
    if (!validateTextOnly(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'First name can only contain letters',
      }));
    } else if (!validateMaxLength(value, 30)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'First name cannot be longer than 30 characters',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
    }
    const capitalizedFirstLetter = capitalizeFirstLetter(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      firstName: capitalizedFirstLetter,
    }));
  }

  function handleLastNameChange(event) {
    const { value } = event.target;
    if (!validateTextOnly(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Last name can only contain letters',
      }));
    } else if (!validateMaxLength(value, 30)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Last name cannot be longer than 30 characters',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
    }
    const capitalizedFirstLetter = capitalizeFirstLetter(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      lastName: capitalizedFirstLetter,
    }));
  }

  async function handleUsernameChange(event) {
    let timeout = null;
    const { value } = event.target;
    const newErrors = [];
    if (!validateTextAndNumbersOnly(value)) {
      newErrors.push('Username can only contain letters and numbers');
    }
    if (!validateMaxLength(value, 15)) {
      newErrors.push('Username cannot be longer than 15 characters');
    }
    if (!validateNotOnlyNumbers(value)) {
      newErrors.push('Username cannot contain only numbers');
    }
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (value) {
        const querySnapshot = await getDocs(
          query(collection(db, 'profile'), where('username', '==', value))
        );
        if (!querySnapshot.empty) {
          newErrors.push('Username is already in use');
        }
      }
      setErrors((prevErrors) => ({ ...prevErrors, username: newErrors }));
    }, 1);

    const decapizalizedString = convertToLowercase(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      username: decapizalizedString,
    }));
  }

  function handleAgeChange(value) {
    const age = parseInt(value, 10);
    if (!validateNumbersOnly(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: 'Age can only contain numbers',
      }));
    } else if (age < 18) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: 'You need to be at least 18 to use Bimbeer',
      }));
    } else if (age > 120) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: 'Please enter your real age',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, age: '' }));
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      age: value,
    }));
  }

  async function handleAvatarChange(event) {
    const avatar = event.target.files[0];
    if (!validateFileType(avatar, ['image/jpeg', 'image/png', 'image/gif'])) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatar: 'Avatar must be a JPEG, PNG, or GIF image',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, avatar: '' }));
      setSelectedFile(avatar);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreviewState(e.target.result);
      };
      reader.readAsDataURL(avatar);
    }
  }

  function handleAboutChange(event) {
    const { value } = event.target;
    if (value && value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: 'About section cannot contain only space characters',
      }));
    } else if (!validateMaxLength(value, 255)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: 'About section cannot be longer than 255 characters',
      }));
    } else if (value && !validateNotOnlyNumbers(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description:
          'About section cannot contain only numbers or only spaces and numbers',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
    }
    const capitalizedFirstLetter = capitalizeFirstLetter(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      description: capitalizedFirstLetter,
    }));
  }

  const handleUploadClick = React.useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  React.useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreviewState(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  return (
    <Stack spacing={8} mx="auto" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Setup your profile infomation
        </Heading>
      </Stack>
      <Box rounded="lg" bg={theme.palette.secondary} boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <HStack spacing={4} alignItems="flex-start">
            <FormControl
              isRequired
              w="sm"
              id="firstName"
              isInvalid={errors.firstName}
            >
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                value={profile.firstName}
                onChange={(event) => handleFirstNameChange(event)}
              />
              {errors.firstName && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {errors.firstName}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              w="sm"
              id="lastName"
              isInvalid={errors.lastName}
            >
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                value={profile.lastName}
                onChange={(event) => handleLastNameChange(event)}
              />
              {errors.lastName && (
                <FormErrorMessage>
                  <FormErrorIcon />
                  {errors.lastName}
                </FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <FormControl
            isRequired
            id="username"
            isInvalid={errors.username.length > 0}
          >
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={profile.username}
              onChange={(event) => handleUsernameChange(event)}
            />
            {errors.username.map((error) => (
              <FormErrorMessage key={error}>
                <FormErrorIcon />
                {error}
              </FormErrorMessage>
            ))}
          </FormControl>
          <HStack>
            <FormControl isRequired id="age" isInvalid={errors.age}>
              <FormLabel>Age</FormLabel>
              <NumberInput
                min={0}
                value={profile.age}
                onChange={(event) => handleAgeChange(event)}
                borderColor="gray"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper color="gray" />
                  <NumberDecrementStepper color="gray" size="sm" />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.age}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="avatar" isInvalid={errors.avatar}>
              <VisuallyHidden>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => handleAvatarChange(event)}
                />
              </VisuallyHidden>
              <Flex gap={30} alignItems="center">
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
                    {selectedFile ? 'Uploaded!' : 'Choose File'}
                  </Button>
                </VStack>
                {errors.avatar && (
                  <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.avatar}
                  </FormErrorMessage>
                )}
                {avatarPreviewState && (
                  <Image
                    src={avatarPreviewState}
                    alt="Avatar preview"
                    boxSize="70px"
                    objectFit="cover"
                    borderRadius="full"
                  />
                )}
              </Flex>
            </FormControl>
          </HStack>
          <FormControl
            isRequired
            id="description"
            isInvalid={errors.description}
          >
            <FormLabel>About me</FormLabel>
            <Textarea
              _placeholder={{ color: 'gray' }}
              borderColor="gray"
              placeholder="Say something about youself."
              size="sm"
              value={profile.description}
              onChange={(event) => handleAboutChange(event)}
            />
            {errors.description && (
              <FormErrorMessage>
                <FormErrorIcon />
                {errors.description}
              </FormErrorMessage>
            )}
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
                <Radio value="Man">Male</Radio>
                <Radio value="Woman">Female</Radio>
                <Radio value="Other">Other</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired as="fieldset">
            <FormLabel as="legend">Show me</FormLabel>
            <RadioGroup
              value={profile.interest}
              onChange={(e) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  interest: e,
                }))
              }
            >
              <HStack spacing="24px">
                <Radio value="Man">Man</Radio>
                <Radio value="Woman">Woman</Radio>
                <Radio value="All">All</Radio>
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
}

ProfileInfoForm.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    age: PropTypes.number,
    description: PropTypes.string,
    gender: PropTypes.string,
    interest: PropTypes.string,
  }).isRequired,
  setProfile: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  selectedFile: PropTypes.instanceOf(File).isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  avatarPreview: PropTypes.string.isRequired,
};
