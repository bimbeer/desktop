import { Center, Spinner } from '@chakra-ui/react';

export default function BimbeerSpinner() {
  return (
    <Center h="40vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.700"
        color="yellow.500"
        size="xl"
      />
    </Center>
  );
}
