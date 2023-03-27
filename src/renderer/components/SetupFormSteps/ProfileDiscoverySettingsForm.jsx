import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
  FormErrorMessage,
  FormErrorIcon,
} from '@chakra-ui/react';

const DEBOUNCE_DELAY = 500;

export default function ProfileDiscoverySettingsForm({
  profile,
  setProfile,
  handleNextStep,
  handleBackStep,
  city: cityProp,
  setCity,
}) {
  const theme = useTheme();
  const debounceInput = useDebounce();
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
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
      setCity(foundCity.address.label);
      setCities([]);
      setIsCityEmpty(true);
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
    if (!cityProp) {
      setCities([]);
      setCitiesLoading(false);
      setIsCityEmpty(false);
      return;
    }
    if (selectedCityState && selectedCityState.address?.label === cityProp) {
      setCitiesLoading(false);
      setIsCityEmpty(true);
      return;
    }
    setCitiesLoading(true);
    debounceInput(cityProp, fetchCities, DEBOUNCE_DELAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityProp]);

  return (
    <Stack spacing={8} mx="auto" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Setup your discovery settings
        </Heading>
      </Stack>
      <Box rounded="lg" bg={theme.palette.secondary} boxShadow="lg" p={8}>
        <Stack spacing={4}>
          <FormControl isRequired id="location" isInvalid={isCityTouched && !cityProp}>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              _placeholder={{ color: 'gray' }}
              value={cityProp}
              onChange={(e) => setCity(e.target.value)}
              onBlur={handleCityBlur}
              placeholder="Enter your city"
            />
            <FormErrorMessage><FormErrorIcon/>
            Please select a city from the list
            </FormErrorMessage>

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
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
};