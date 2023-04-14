import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserAuth } from '../context/AuthContext.jsx';
import LoadingScreen from './Start/LoadingScreen.jsx';

export default function AuthRoute({ children }) {
  const { user, initializing } = UserAuth();
  const location = useLocation();

  if (initializing) {
    return <LoadingScreen />;
  }

  if (user && (location.pathname === '/' || location.pathname === '/sign-up')) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
