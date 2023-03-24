/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { UserAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import '../theme/css/SignInForm.css';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUser(email, password);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
      const errorCode = e.code;
      if (errorCode === 'auth/weak-password') {
        setError('The password must be at least 6 characters.');
      }
      if (errorCode === 'auth/email-already-in-use') {
        setError('Email is already in use.');
      }
    }
  };

  return (
    <div className="signin_section">
      <div>
        <a href="/">
          <img src={logo} className="logo" alt="Bimbeer Logo" />
        </a>
      </div>
      {error && (
        <Text fontSize="sm" color="white">
          {error}
        </Text>
      )}
      <div>
        <form onSubmit={handleSignUp}>
          <div className="input_field">
            <input
              type="text"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input_field">
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input_field">
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirm_password">Confirm Password</label>
          </div>
          <Text fontSize="sm" color="white">
            Already have an account?{` `}
            <a href="/">
              <b>Log In</b>
            </a>
          </Text>
          <div className="signin-button">
            <button type="submit">
              <RiArrowRightLine className="icon" />
            </button>
          </div>
        </form>
      </div>
      <div className="other-actions">
        <div>
          <div>V1.0.0</div>
        </div>
      </div>
    </div>
  );
}
