import { useState } from 'react';
import { Flex, Box, Stack, Text, Button, IconButton } from '@chakra-ui/react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaTimes,
} from 'react-icons/fa';

function PictureCount({ count, current }) {
  return (
    <Flex w="100%" pt={1} px={4}>
      {Array.from({ length: count }, (_, i) => (
        <Box
          key={i}
          flex="1"
          h="4px"
          bg={i === current ? 'yellow.400' : 'gray.500'}
          mx={1}
          rounded="1rem"
        />
      ))}
    </Flex>
  );
}

function BimbeerCard() {
  const [showMore, setShowMore] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const handleMouseEnter = () => setShowArrows(true);
  const handleMouseLeave = () => setShowArrows(false);

  return (
    <Flex align="center" justify="center" w="100%" minH="100vh">
      <Box
        maxW="450px"
        w="100%"
        h="70vh"
        rounded="1rem"
        bg="gray.800"
        bgImage="https://www.history.com/.image/t_share/MTk1NTU5MDQ0MTYzODM5MDM3/gettyimages-1386915196.jpg"
        bgPos="top"
        bgRepeat="no-repeat"
        bgSize="cover"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        position="relative"
      >
        <PictureCount
          count={5}
          current={1}
          position="absolute"
          top={4}
          left={0}
          w="100%"
        />
        <Flex
          direction="column"
          rounded="1rem"
          h="100%"
          bgGradient="linear(to-b, whiteAlpha.50 60%, blackAlpha.900 100%)"
          justify="space-between"
        >
          {showArrows && (
            <>
              <Box
                position="absolute"
                left="1rem"
                top="50%"
                transform="translateY(-50%)"
                onClick={() => console.log('left arrow clicked')}
              >
                <FaChevronLeft size={24} color="#ffffff" />
              </Box>

              <Box
                position="absolute"
                right="1rem"
                top="50%"
                transform="translateY(-50%)"
                onClick={() => console.log('right arrow clicked')}
              >
                <FaChevronRight size={24} color="#ffffff" />
              </Box>
            </>
          )}

          <Box />
          <Stack p="1rem">
            <Text size="md">
              Username, 19
              <Text fontSize="xs">Legnica</Text>
            </Text>

            <Text
              fontSize="xs"
              lineHeight="1.2rem"
              maxH={showMore ? '' : '2.4rem'}
              overflow={showMore ? '' : 'hidden'}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
              obcaecati quibusdam impedit, dolore nostrum possimus! Non quam
              reiciendis unde, labore blanditiis tenetur, perferendis modi
              impedit, soluta error officiis iusto cupiditate.
            </Text>

            <Button
              color="black"
              _hover={{
                bg: 'yellow.500',
              }}
              size="sm"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show less' : 'Show more'}
            </Button>
          </Stack>
        </Flex>
        <Flex justify="center" mt={4} gap={50}>
          <IconButton
            aria-label="Decline"
            icon={<FaTimes />}
            onClick={() => console.log('decline clicked')}
            fontSize="30px"
            boxSize="60px"
            bg="transparent"
            color="red.300"
            borderColor="red.300"
            borderWidth={1}
            colorScheme="red"
            rounded="2rem"
          />
          <IconButton
            aria-label="Heart"
            icon={<FaHeart />}
            onClick={() => console.log('heart clicked')}
            fontSize="30px"
            boxSize="60px"
            bg="transparent"
            color="green.300"
            borderColor="green.300"
            borderWidth={1}
            colorScheme="green"
            rounded="2rem"
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default BimbeerCard;
