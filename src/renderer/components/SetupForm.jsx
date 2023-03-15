import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  RadioGroup,
  Radio,
  Textarea,
  useTheme,
} from '@chakra-ui/react';

export default function SetupForm() {
  const theme = useTheme();
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={theme.palette.primary}
    >
      <Stack spacing={8} mx="auto" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Setup your account
          </Heading>
        </Stack>
        <Box rounded="lg" bg={theme.palette.secondary} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <HStack spacing={4}>
              <Box>
                <FormControl id="firstName">
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="text">
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="text">
              <FormLabel>Age</FormLabel>
              <InputGroup>
                <Input type="text" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>About me</FormLabel>
              <Textarea
                _placeholder={{ color: 'white' }}
                placeholder="Say something about yourself."
                size="sm"
              />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Gender</FormLabel>
              <RadioGroup>
                <HStack spacing="24px">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Show me</FormLabel>
              <RadioGroup>
                <HStack spacing="24px">
                  <Radio value="Male">Man</Radio>
                  <Radio value="Female">Woman</Radio>
                  <Radio value="Both">Both</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Proceeding"
                color="black"
                size="lg"
                bg={theme.palette.accent}
                _hover={{
                  bg: 'yellow.500',
                }}
              >
                Proceed
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
