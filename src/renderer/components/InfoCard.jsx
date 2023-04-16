import React from 'react';
import { Card, Center, Text, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function InfoCard({ heading, text, beerStatus }) {
  return (
    <>
      <Card p={5} bg="whiteAlpha.100" maxW={650}>
        <Center>
          <Text color="white" fontSize={20} fontWeight={900} mb={2}>
            {heading}
          </Text>
        </Center>
        <Center>
          <Text color="white">{text}</Text>
        </Center>
      </Card>
      <Image src={beerStatus} ml={10} h="300px" />
    </>
  );
}

InfoCard.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  beerStatus: PropTypes.string.isRequired,
};
