import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { geohashForLocation } from 'geofire-common';
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
  FormErrorMessage,
  FormErrorIcon,
} from '@chakra-ui/react';

import useDebounce from 'renderer/hooks/useDebounceInput';

const DEBOUNCE_DELAY = 500;

export default function ProfileDiscoverySettingsForm({
  profile,
  setProfile,
  handleNextStep,
  handleBackStep,
  city: cityProp,
  setCity,
  setCoordinates,
  setGeohash,
}) {
  const theme = useTheme();
  const debounceInput = useDebounce();
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [cityInputValue, setCityInputValue] = useState(cityProp);
  const [selectedCityState, setSelectedCityState] = useState(null);
  const [isCityEmpty, setIsCityEmpty] = useState(false);
  const [isCityTouched, setIsCityTouched] = useState(false);

  const handleCityBlur = () => {
    setIsCityTouched(true);
  };

  const handleCitySelect = (cityId) => {
    const foundCity = cities.find((city) => city.id === cityId);
    if (foundCity) {
      setSelectedCityState(foundCity);
      setCityInputValue(foundCity.address.label);
      setCity(foundCity.address.label);
      setCities([]);
      setIsCityEmpty(true);
      setCoordinates([foundCity.position.lat, foundCity.position.lng]);
      setGeohash(
        geohashForLocation([foundCity.position.lat, foundCity.position.lng])
      );
    }
  };

  const fetchCities = async () => {
    const res = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${
        cityInputValue.label ? cityInputValue.label : cityInputValue
      }&apiKey=RQnyfAQCOhZukJzCLB6AEWHRZrSgU8mYkwSL80KZDrs`
    );
    setCities(res.data.items);
    setCitiesLoading(false);
  };

  useEffect(() => {
    if (!cityInputValue) {
      setCities([]);
      setCitiesLoading(false);
      setIsCityEmpty(false);
      return;
    }
    if (
      selectedCityState &&
      selectedCityState.address?.label === cityInputValue
    ) {
      setCitiesLoading(false);
      setIsCityEmpty(true);
      return;
    }
    setCitiesLoading(true);
    debounceInput(cityInputValue, fetchCities, DEBOUNCE_DELAY);
  }, [cityInputValue]);

  return (
    <Stack spacing={8} mx="auto" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Setup your discovery settings
        </Heading>
      </Stack>
      <Box rounded="lg" bg={theme.palette.secondary} boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <FormControl
            isRequired
            id="location"
            isInvalid={isCityTouched && !cityInputValue}
          >
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              _placeholder={{ color: 'gray' }}
              value={
                cityInputValue.label ? cityInputValue.label : cityInputValue
              }
              onChange={(e) => {
                setCityInputValue(e.target.value);
                setCity(e.target.value);
              }}
              onBlur={handleCityBlur}
              placeholder="Enter your city"
            />
            <FormErrorMessage>
              <FormErrorIcon />
              Please select a city from the list
            </FormErrorMessage>
            {cities.length === 0 && !citiesLoading && cityInputValue && (
              <List
                display={!selectedCityState || !isCityEmpty ? 'block' : 'none'}
              >
                <ListItem>
                  <Box bg="gray.700" p="1rem" mt={2} rounded="1rem">
                    No cities were found
                  </Box>
                </ListItem>
              </List>
            )}

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
                    mt={-8}
                    mb={10}
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
            <FormLabel mt={-8} mb={8}>
              Range settings
            </FormLabel>
            <Flex>
              <Slider
                maxWidth="99%"
                defaultValue={profile.range}
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
                  mt="-8"
                  ml="-5"
                  w="30"
                >
                  {profile.range}km
                </SliderMark>
                <SliderTrack bg="yellow.800">
                  <SliderFilledTrack bg="yellow.500" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Flex>
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
                isChecked={profile.isGlobal}
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
                isChecked={profile.isLocal}
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
              isDisabled={!selectedCityState || !isCityEmpty}
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

ProfileDiscoverySettingsForm.propTypes = {
  profile: PropTypes.shape({
    range: PropTypes.number,
    isGlobal: PropTypes.bool,
    isLocal: PropTypes.bool,
  }).isRequired,
  setProfile: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  handleBackStep: PropTypes.func.isRequired,
  city: PropTypes.shape({
    label: PropTypes.string.isRequired,
    position: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      geohash: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setCity: PropTypes.func.isRequired,
  setCoordinates: PropTypes.func.isRequired,
  setGeohash: PropTypes.func.isRequired,
};
