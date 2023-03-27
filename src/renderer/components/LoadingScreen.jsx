import React from 'react';
import { Box, Center, Image, Spinner, Text } from '@chakra-ui/react';
import logo from '../assets/images/logo.png';

// eslint-disable-next-line react/prop-types
export default function LoadingScreen({ isLoading }) {
  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bg="#141517"
      display={isLoading ? 'flex' : 'none'}
      zIndex={10}
    >
      <Center h="100%" w="100%">
        <Image position="fixed" top={130} src={logo} alt="Bimbeer Logo" />
        <Text fontSize="4xl" mr={4}>
          We&apos;re logging you in, sit tight!
        </Text>
        <Spinner thickness="4px" size="xl" color="white" />
      </Center>
    </Box>
  );
}
