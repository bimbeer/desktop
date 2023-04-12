import {
  Avatar,
  Button,
  Flex,
  Grid,
  Icon,
  Switch,
  Text,
  Center,
  useColorMode,
  useColorModeValue,
  Image,
  Box,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import {
  UserAuth,
  getUserFromLocalStorage,
} from 'renderer/context/AuthContext';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { getUserData } from 'renderer/services/profiles';
import Sidebar from 'renderer/components/Sidebar';
import Card from './ProfileCards/Card';
import CardBody from './ProfileCards/CardBody';
import CardHeader from './ProfileCards/CardHeader';

export default function ProfilePanel() {
  const { colorMode } = useColorMode();
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const headerColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('white', 'white');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    location: '',
  });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const userId = getUserFromLocalStorage();
    async function fetchData() {
      const userData = await getUserData(userId);
      if (userData) {
        setProfileData(userData);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <Center>
        <Flex
          direction="column"
          width="160vh"
          minH="100vh"
          ml="100px"
          mr="20px"
          pt={{ base: '120px', md: '75px', lg: '100px' }}
        >
          <Flex
            direction={{ sm: 'column', md: 'row' }}
            mb="24px"
            maxH="330px"
            justifyContent={{ sm: 'center', md: 'space-between' }}
            align="center"
            backdropFilter="blur(21px)"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="1px solid"
            borderColor="black"
            bg="yellow.500"
            p="24px"
            borderRadius="20px"
          >
            <Flex
              align="center"
              mb={{ sm: '10px', md: '0px' }}
              direction={{ sm: 'column', md: 'row' }}
              w={{ sm: '100%' }}
              textAlign={{ sm: 'center', md: 'start' }}
            >
              <Avatar
                me={{ md: '22px' }}
                w="80px"
                h="80px"
                borderRadius="15px"
                src={profileData.avatar}
              />
              <Flex direction="column" maxWidth="100%" my={{ sm: '14px' }}>
                <Text
                  fontSize={{ sm: 'lg', lg: 'xl' }}
                  color="black"
                  fontWeight="bold"
                  ms={{ sm: '8px', md: '0px' }}
                >
                  {profileData.firstName} {profileData.lastName}
                </Text>
                <Text
                  fontSize={{ sm: 'sm', md: 'md' }}
                  color="whiteAlpha.900"
                  fontWeight="semibold"
                >
                  @{profileData.username}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={{ sm: 'column', lg: 'row' }}
              w={{ sm: '100%', md: '50%', lg: 'auto' }}
            >
              <Link to="/setup">
                <Button
                  w={{ sm: '100%', lg: '135px' }}
                  p="5px"
                  bg="transparent"
                  variant="no-effects"
                >
                  <Flex
                    align="center"
                    w={{ sm: '100%', lg: '135px' }}
                    bg={colorMode === 'dark' ? 'navy.900' : '#fff'}
                    borderRadius="8px"
                    justifyContent="center"
                    py="10px"
                    transition="transform 0.2s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  >
                    <Icon color={headerColor} as={FaPenFancy} me="6px" />
                    <Text fontSize="xs" color={headerColor} fontWeight="bold">
                      EDIT PROFILE
                    </Text>
                  </Flex>
                </Button>
              </Link>
              <Button p="5px" bg="transparent" variant="no-effects">
                <Flex
                  align="center"
                  w={{ sm: '100%', lg: '135px' }}
                  bg={colorMode === 'dark' ? 'navy.900' : '#fff'}
                  borderRadius="8px"
                  justifyContent="center"
                  py="10px"
                  transition="transform 0.2s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                  onClick={handleLogout}
                >
                  <Icon color={headerColor} as={RiLogoutBoxRLine} me="6px" />
                  <Text fontSize="xs" color={headerColor} fontWeight="bold">
                    LOGOUT
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
          <Grid
            templateColumns={{ sm: '1fr', xl: 'repeat(3, 1fr)' }}
            gap="22px"
          >
            <Card
              p="16px"
              bg="gray.800"
              rounded="2rem"
              my={{ sm: '24px', xl: '0px' }}
            >
              <CardHeader p="12px 5px" mb="12px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Profile Information
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color="gray.400"
                    fontWeight="400"
                    mb="30px"
                    overflowWrap="normal"
                  >
                    {profileData.description}
                  </Text>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Full Name:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.firstName} {profileData.lastName}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Age:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.age}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Gender:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.gender}
                    </Text>
                  </Flex>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Interest:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.interest}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
            <Card p="16px" bg="gray.800" rounded="2rem">
              <CardHeader p="12px 5px" mb="12px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Discovery Settings
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column">
                  <Text
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="600"
                    mb="20px"
                  >
                    LOCATION SETTINGS
                  </Text>
                  <Flex align="center" mb="18px">
                    <Text
                      fontSize="md"
                      color={textColor}
                      fontWeight="bold"
                      me="10px"
                    >
                      Location:{' '}
                    </Text>
                    <Text fontSize="md" color="gray.400" fontWeight="400">
                      {profileData.location.label}
                    </Text>
                  </Flex>
                  <Text
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="600"
                    m="20px 0px 20px 0px"
                  >
                    RANGE SETTINGS
                  </Text>
                  <Box pt={6} pb={2}>
                    <Slider
                      isDisabled
                      aria-label="slider-ex-6"
                      value={profileData.range}
                    >
                      <SliderMark
                        value={profileData.range}
                        textAlign="center"
                        color="white"
                        mt="-10"
                        ml="-5"
                        w="12"
                      >
                        {profileData.range}km
                      </SliderMark>
                      <SliderTrack bg="yellow.800">
                        <SliderFilledTrack bg="yellow.500" />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Text
                      py={4}
                      noOfLines={1}
                      fontSize="md"
                      color="gray.400"
                      fontWeight="400"
                    >
                      Distance preference:
                    </Text>
                    <Flex align="center" mb="20px">
                      <Switch
                        isChecked={profileData.isGlobal}
                        colorScheme="yellow"
                        me="10px"
                        isDisabled
                      />
                      <Text
                        noOfLines={1}
                        fontSize="md"
                        color="gray.400"
                        fontWeight="400"
                      >
                        Global
                      </Text>
                    </Flex>
                    <Flex align="center" mb="20px">
                      <Switch
                        isChecked={profileData.isLocal}
                        colorScheme="yellow"
                        me="10px"
                        isDisabled
                      />
                      <Text
                        noOfLines={1}
                        fontSize="md"
                        color="gray.400"
                        fontWeight="400"
                      >
                        Only show people in this range
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
            <Card
              p="16px"
              bg="gray.800"
              rounded="2rem"
              my={{ sm: '24px', xl: '0px' }}
            >
              <CardHeader p="12px 5px" mb="12px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Favourite beers
                </Text>
              </CardHeader>
              <CardBody px="5px">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color="gray.400"
                    fontWeight="400"
                    mb="30px"
                  >
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                      {profileData.beers &&
                        profileData.beers.map((beer) => (
                          <Box maxW="300px" key={beer.name}>
                            <Center>
                              <Image
                                p={2}
                                maxW="40%"
                                maxH="150px"
                                src={beer.link}
                                alt={beer.name}
                              />
                            </Center>
                            <Center>
                              <Text textAlign="center">{beer.name}</Text>
                            </Center>
                          </Box>
                        ))}
                    </Grid>
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </Grid>
        </Flex>
      </Center>
    </>
  );
}
