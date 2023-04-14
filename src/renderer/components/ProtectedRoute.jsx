import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, initializing } = UserAuth();

  if (initializing) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
