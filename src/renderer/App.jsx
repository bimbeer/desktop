import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Start from './components/Start';
import Login from './pages/Login';
import AuthDetails from './components/AuthDetails';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

function StartPage() {
  return <Login />;
}

function LoggedPage() {
  return <Start />;
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#1a1a1a">
        <Router>
          <AuthDetails />
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/start" element={<LoggedPage />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}
