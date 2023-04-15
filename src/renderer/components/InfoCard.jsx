import React from 'react';
import { Card, Center, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function InfoCard({ text }) {
  return (
    <Card p={10} bg="whiteAlpha.100" maxW={550}>
      <Center>
        <Text color="white">{text}</Text>
      </Center>
    </Card>
  );
}

InfoCard.propTypes = {
  text: PropTypes.string.isRequired,
};
