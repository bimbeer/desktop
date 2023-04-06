import { useState } from 'react';
import { Flex, Box, Stack, Text, IconButton, Collapse } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaTimes,
} from 'react-icons/fa';
import { BsInfoCircleFill } from 'react-icons/bs';
import PictureCount from './PictureCount';

export default function BimbeerCard({ user, onUserAction }) {
  const [showDescription, setShowDescription] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [currentBeerIndex, setCurrentBeerIndex] = useState(0);

  const handleMouseEnter = () => setShowArrows(true);
  const handleMouseLeave = () => setShowArrows(false);

  const handlePrevBeer = () => {
    if (currentBeerIndex > 0) {
      setCurrentBeerIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextBeer = () => {
    if (currentBeerIndex < user.beers.length - 1) {
      setCurrentBeerIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" ml="100px" mr="20px">
      <Box
        top={-8}
        maxW="450px"
        w="100%"
        h="70vh"
        rounded="1rem"
        bg="gray.800"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        position="relative"
        bgGradient="linear(to-b, whiteAlpha.50 60%, blackAlpha.900 100%)"
      >
        <Box
          position="absolute"
          top="30px"
          left={0}
          right={0}
          bottom="80px"
          bgImage={user.beers[currentBeerIndex].link}
          bgPos="top"
          bgRepeat="no-repeat"
          bgSize="contain"
        />
        <PictureCount
          count={user.beers.length}
          current={currentBeerIndex}
          position="absolute"
          top={4}
          left={0}
          w="100%"
        />
        <Flex
          direction="column"
          rounded="1rem"
          h="100%"
          justify="space-between"
        >
          {showArrows && (
            <>
              {currentBeerIndex > 0 && (
                <Box
                  position="absolute"
                  left={2}
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={handlePrevBeer}
                >
                  <IconButton
                    fontSize="25px"
                    color="#ffffff"
                    aria-label="previous-beer"
                    icon={<FaChevronLeft />}
                    bg="transparent"
                    _hover={{
                      bg: 'transparent',
                      transform: 'scale(1.2)',
                    }}
                  />
                </Box>
              )}

              {currentBeerIndex < user.beers.length - 1 && (
                <Box
                  position="absolute"
                  right={2}
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={handleNextBeer}
                >
                  <IconButton
                    fontSize="25px"
                    color="#ffffff"
                    aria-label="next-beer"
                    icon={<FaChevronRight />}
                    bg="transparent"
                    _hover={{
                      bg: 'transparent',
                      transform: 'scale(1.2)',
                    }}
                  />
                </Box>
              )}
            </>
          )}

          <Box />
          <Stack mb="15px" p="1rem" zIndex={10}>
            <Flex justify="space-between" align="center">
              <Text fontSize="25px" fontWeight="600">
                {user.firstName}, {user.age}
                <Text fontSize="sm" fontWeight="100">
                  {user.location.label}
                </Text>
              </Text>
              <IconButton
                size="lg"
                aria-label="show-description"
                icon={<BsInfoCircleFill />}
                onClick={() => setShowDescription(!showDescription)}
                bg="transparent"
                _hover={{
                  bg: 'transparent',
                  transform: 'scale(1.2)',
                }}
              />
            </Flex>

            <Collapse in={showDescription}>
              <Text fontSize="xs" lineHeight="1.2rem">
                {user.description}
              </Text>
            </Collapse>
          </Stack>
        </Flex>
        <Flex justify="center" mt={4} gap={50}>
          <IconButton
            aria-label="Decline"
            icon={<FaTimes />}
            onClick={onUserAction}
            fontSize="30px"
            boxSize="60px"
            bg="transparent"
            _hover={{
              bg: 'red.800',
              transform: 'scale(1.2)',
            }}
            color="red.300"
            borderColor="red.800"
            borderWidth={1}
            rounded="2rem"
          />
          <IconButton
            aria-label="Heart"
            icon={<FaHeart />}
            onClick={onUserAction}
            fontSize="30px"
            boxSize="60px"
            bg="transparent"
            _hover={{
              bg: 'green.800',
              transform: 'scale(1.2)',
            }}
            color="green.300"
            borderColor="green.800"
            borderWidth={1}
            rounded="2rem"
          />
        </Flex>
      </Box>
    </Flex>
  );
}

BimbeerCard.propTypes = {
  user: PropTypes.shape({
    beers: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
      })
    ).isRequired,
    firstName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    location: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onUserAction: PropTypes.func.isRequired,
};
