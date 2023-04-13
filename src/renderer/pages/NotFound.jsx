import React from 'react';

import { Card, CardBody, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';

import '../theme/css/NotFound.css';

export default function NotFound() {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Card bg="whiteAlpha.100" maxW={600}>
        <CardBody p={30}>
          <Stack spacing="3">
            <Center>
              <Text fontSize="6xl" color="white" pr="4">
                404
              </Text>
              <Text color="white">
                You happened to get lost in our mysterious bimbeery. Pressing
                home button will take you back to civilization.
              </Text>
              <div className="home-button">
                <Link to="/" className="button">
                  <RiHome2Line className="icon" />
                </Link>
              </div>
            </Center>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}
