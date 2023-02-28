import './App.css';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';

import Start from './components/Start';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#1a1a1a">
        <Start />
      </Box>
    </ChakraProvider>
  );
}
export default App;
