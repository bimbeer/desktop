import {
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaBeer, FaGithubSquare } from 'react-icons/fa';

export default function Start() {
  return (
    <>
      <Heading size="md" mt={30} mb={30}>
        <Center>
          <HStack>
            <FaBeer color="gold" />
            <Text size="sm" color="white">
              Bimbeer
            </Text>
          </HStack>
        </Center>
      </Heading>
      <Flex minH="80vh" align="center" justify="center">
        <Card bg="whiteAlpha.100" maxW={400}>
          <CardBody p={30}>
            <Stack spacing="3">
              <Text color="white">
                Witaj na stronie Bimbeer gdzie znajdziesz idealnego kompana do
                smakowania browaru.
              </Text>
              <Text color="white">Strona jest w budowie...</Text>

              <Link color="white" href="https://github.com/bimbeer" isExternal>
                <Center>
                  <HStack>
                    <Text color="white">GitHub</Text>
                    <FaGithubSquare color="white" size={40} />
                  </HStack>
                </Center>
              </Link>
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
