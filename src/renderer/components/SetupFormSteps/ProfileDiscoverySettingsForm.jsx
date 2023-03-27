import React, { useEffect, useState } from 'react';
import useDebounce from 'renderer/hooks/useDebounceInput';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useTheme,
  Flex,
  Spinner,
  List,
  ListItem,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Text,
} from '@chakra-ui/react';

export default function ProfileDiscoverySettingsForm({
  profile,
  setProfile,
  handleNextStep,
  handleBackStep,
  city,
  setCity,
}) {
  const theme = useTheme();
  const debounceInput = useDebounce();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const DEBOUNCE_DELAY = 500;

  const handleCitySelect = (cityId) => {
    const selectedCity = cities.find((city) => city.id === cityId);
    if (selectedCity) {
      setSelectedCity(selectedCity);
      setCity(selectedCity.address.label);
      setCities([]);
    }
  };

  const fetchCities = async (newString) => {
    const res = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${newString}&apiKey=RQnyfAQCOhZukJzCLB6AEWHRZrSgU8mYkwSL80KZDrs`
    );
    setCities(res.data.items);
    setCitiesLoading(false);
  };

  useEffect(() => {
    if (!city) {
      setCities([]);
      setCitiesLoading(false);
      return;
    }
    if (selectedCity && selectedCity.address?.label === city) {
      setCitiesLoading(false);
      return;
    }
    setCitiesLoading(true);
    debounceInput(city, fetchCities, DEBOUNCE_DELAY);
  }, [city]);

  return (
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
              _placeholder={{ color: 'gray' }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
            />
            <Flex
              justify="center"
              align="center"
              visibility={citiesLoading ? 'visible' : 'hidden'}
            >
              <Spinner size="md" mt={4} color="yellow.500" />
            </Flex>

            <List
              display={cities.length > 0 && !citiesLoading ? 'block' : 'none'}
            >
              {cities.map((city) => (
                <ListItem key={city.id}>
                  <Box
                    _hover={{
                      bg: 'yellow.500',
                      ml: '1rem',
                    }}
                    bg="gray.700"
                    transition="all 0.15s ease-in"
                    p="1rem"
                    mb="0.5rem"
                    rounded="1rem"
                    cursor="pointer"
                    onClick={() => handleCitySelect(city.id)}
                  >
                    {city.address.label}
                  </Box>
                </ListItem>
              ))}
            </List>
          </FormControl>
          <FormControl isRequired>
            <FormLabel mb={8}>Range settings</FormLabel>
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
                sx={{
                  'span.chakra-switch__track:not([data-checked])': {
                    backgroundColor: 'gray.600',
                  },
                }}
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
                sx={{
                  'span.chakra-switch__track:not([data-checked])': {
                    backgroundColor: 'gray.600',
                  },
                }}
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
              isDisabled={!selectedCity}
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
}
