import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text, Spinner, Flex } from '@chakra-ui/react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RiArrowRightLine } from 'react-icons/ri';
import { getRedirectResult } from 'firebase/auth';

import logo from 'renderer/assets/images/logo.png';
import 'renderer/theme/css/AuthForms.css';
import { UserAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/firebase';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const { signIn, googleSignIn, facebookSignIn } = UserAuth();

  const ERROR_INVALID_EMAIL = 'auth/invalid-email';
  const ERROR_WRONG_PASSWORD = 'auth/wrong-password';

  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');
    try {
      await signIn(email, password);
      setIsAuthLoading(false);
    } catch (e) {
      setAuthError(e.message);
      const errorCode = e.code;

      if (
        errorCode === ERROR_INVALID_EMAIL ||
        errorCode === ERROR_WRONG_PASSWORD
      ) {
        setAuthError('The email address or password you entered is invalid.');
      }
      setIsAuthLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await googleSignIn();
  };

  const handleFacebookSignIn = async () => {
    setIsFacebookLoading(true);
    await facebookSignIn();
  };

  useEffect(() => {
    if (window.sessionStorage.getItem('pending')) {
      window.sessionStorage.removeItem('pending');
      getRedirectResult(auth);
    }
  }, []);

  return (
    <div className="signin_section">
      <div>
        <Link to="/">
          <img src={logo} className="logo" alt="Bimbeer Logo" />
        </Link>
      </div>
      {authError && (
        <Text fontSize="sm" color="red" mt={8}>
          {authError}
        </Text>
      )}
      <div>
        <form onSubmit={handleEmailSignIn}>
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
          <div className="social-media-signin">
            <div className="media-item google-item">
              {isGoogleLoading ? (
                <Spinner size="sm" color="black" />
              ) : (
                <button type="button" onClick={handleGoogleSignIn}>
                  <FcGoogle className="icon" alt="Google Icon" />
                </button>
              )}
            </div>
            <div className="media-item fb-item">
              {isFacebookLoading ? (
                <Spinner size="sm" color="white" />
              ) : (
                <button type="button" onClick={handleFacebookSignIn}>
                  <BsFacebook className="icon" alt="Facebook icon" />
                </button>
              )}
            </div>
          </div>
          <Text fontSize="sm" color="white">
            Don&apos;t have an account?{` `}
            <Link to="/sign-up">
              <b>Sign up</b>
            </Link>
          </Text>
          <div className="signin-button">
            {isAuthLoading ? (
              <Flex>
                <Spinner size="md" color="white" />
              </Flex>
            ) : (
              <button type="submit">
                <RiArrowRightLine className="icon" />
              </button>
            )}
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
