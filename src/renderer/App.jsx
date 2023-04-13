import { Box, ChakraProvider } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteRedirect from './components/ProtectedRouteRedirect';
import theme from './theme/theme';
import './theme/css/App.css';

import Start from './pages/Start';
import SignUp from './pages/SignUp';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg={theme.palette.primary}>
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRouteRedirect>
                    <Start />
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
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/matches"
                element={
                  <ProtectedRoute>
                    <Matches />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages/:pairId"
                element={
                  <ProtectedRoute>
                    <Messages />
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
