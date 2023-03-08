import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Start from './components/Start';
import Login from './components/Login';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

function StartPage() {
  return <Start />;
}

function LoginPage() {
  return <Login />;
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#1a1a1a">
        <Router>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}
