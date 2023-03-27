import React, { useState, useEffect } from 'react';
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
  Text,
  Image,
  Textarea,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

function ProfileInfoForm({
  profile,
  setProfile,
  handleNextStep,
  selectedFile,
  setSelectedFile,
}) {
  const theme = useTheme();
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [avatarPreview, setAvatarPreview] = React.useState();
  const fileInputRef = React.useRef();

  useEffect(() => {
    const isFormValid = () => {
      return (
        profile.firstName &&
        profile.username &&
        profile.age &&
        profile.about &&
        profile.gender &&
        profile.interest &&
        selectedFile
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
    selectedFile,
  ]);

  function handleUploadClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  async function handleAvatarChange(event) {
    const avatar = event.target.files[0];
    setError('');
    if (
      avatar &&
      (avatar.type === 'image/jpeg' ||
        avatar.type === 'image/png' ||
        avatar.type === 'image/gif')
    ) {
      setSelectedFile(avatar);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(avatar);
    }
  }

  return (
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
                value={profile.firstName}
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
                value={profile.age}
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
                {error && (
                  <Text fontSize="sm" color="red">
                    {error}
                  </Text>
                )}
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
              value={profile.about}
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
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  interest: e,
                }))
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
}

export default ProfileInfoForm;
