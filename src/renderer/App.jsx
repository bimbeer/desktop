import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';
import './theme/App.css';

import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="#1a1a1a">
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route component={NotFound} />
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <AuthRoute>
                    <SignUp />
                  </AuthRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthContextProvider>
        </Router>
      </Box>
    </ChakraProvider>
  );
}
