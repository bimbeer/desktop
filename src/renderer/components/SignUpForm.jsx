import React, { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import {
  passwordsMatch,
  isStrongPassword,
  isValidEmail,
} from '../helpers/validators';
import { UserAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import '../theme/css/AuthForms.css';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const ERROR_EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');
    if (!passwordsMatch(password, confirmPassword)) {
      setError('Passwords do not match');
      return;
    }
    if (!isStrongPassword(password)) {
      setError('The password must be at least 6 characters.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Invalid email address.');
      return;
    }
    try {
      await createUser(email, password);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
      const errorCode = e.code;
      if (errorCode === ERROR_EMAIL_ALREADY_IN_USE) {
        setError('Email is already in use.');
      }
    }
  };

  return (
    <div className="signin_section">
      <div>
        <Link to="/">
          <img src={logo} className="logo" alt="Bimbeer Logo" />
        </Link>
      </div>
      {error && (
        <Text fontSize="sm" mt={8} color="red">
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
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
              onChange={handleConfirmPasswordChange}
            />
            <label htmlFor="confirm_password">Confirm Password</label>
          </div>
          <Text fontSize="sm" color="white">
            Already have an account?{` `}
            <Link to="/">
              <b>Sign In</b>
            </Link>
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
