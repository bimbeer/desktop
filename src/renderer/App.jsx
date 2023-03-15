import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteRedirect from './components/ProtectedRouteRedirect';
import './theme/App.css';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Setup from './pages/Setup';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'white',
      },
    },
  },
  palette: {
    primary: '#141517',
    secondary: '#1c1e1f',
    accent: '#d4af37',
  },
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
              <Route
                path="/"
                element={
                  <ProtectedRouteRedirect>
                    <Login />
                  </ProtectedRouteRedirect>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <ProtectedRouteRedirect>
                    <SignUp />
                  </ProtectedRouteRedirect>
                }
              />
              <Route
                path="/setup"
                element={
                  <ProtectedRoute>
                    <Setup />
                  </ProtectedRoute>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthContextProvider>
        </Router>
      </Box>
    </ChakraProvider>
  );
}
