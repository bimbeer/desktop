import { Flex, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function PictureCount({ count, current }) {
  return (
    <Flex w="100%" pt={1} px={4}>
      {Array.from({ length: count }, (_, i) => (
        <Box
          key={i}
          flex="1"
          h="4px"
          mt={1}
          bg={i === current ? 'yellow.400' : 'gray.500'}
          mx={1}
          rounded="1rem"
        />
      ))}
    </Flex>
  );
}

PictureCount.propTypes = {
  count: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};
