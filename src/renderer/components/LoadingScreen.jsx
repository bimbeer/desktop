import React from 'react';
import { Box, Center, Image, Spinner, Text } from '@chakra-ui/react';

import logo from 'renderer/assets/images/logo.png';

export default function LoadingScreen() {
  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bg="#141517"
      display="flex"
      zIndex={10}
    >
      <Center h="100%" w="100%">
        <Image position="fixed" top="25vh" src={logo} alt="Bimbeer Logo" />
        <Text fontSize="4xl" mr={4} mt="25vh">
          We&apos;re logging you in, sit tight!
        </Text>
        <Spinner thickness="4px" size="xl" color="white" mt="25vh" />
      </Center>
    </Box>
  );
}
