import { Box, ChakraProvider } from '@chakra-ui/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteRedirect from './components/ProtectedRouteRedirect';
import './theme/css/App.css';
import theme from './theme/theme';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import Pairs from './pages/Pairs';
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
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pairs"
                element={
                  <ProtectedRoute>
                    <Pairs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
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
