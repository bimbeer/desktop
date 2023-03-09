import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.jsx';

// eslint-disable-next-line react/prop-types
export default function AuthRoute({ children }) {
  const { user } = UserAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }
  return children;
}
