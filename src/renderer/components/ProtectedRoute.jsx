import React from 'react';
import { Navigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext.jsx';

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
