import { Flex, IconButton } from '@chakra-ui/react';
import { CiBeerMugFull } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import PropTypes from 'prop-types';

export default function BimbeerCardButtons({ handleLike, handleDislike }) {
  return (
    <Flex justify="center" mt="-130px" ml={20} gap={50}>
      <IconButton
        aria-label="Dislike"
        icon={<RxCross2 />}
        onClick={handleDislike}
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
        aria-label="Like"
        icon={<CiBeerMugFull />}
        onClick={handleLike}
        fontSize="35px"
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
  );
}

BimbeerCardButtons.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDislike: PropTypes.func.isRequired,
};
