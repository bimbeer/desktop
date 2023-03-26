/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Box, Center, Text, Spinner, Flex, Image } from '@chakra-ui/react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RiArrowRightLine } from 'react-icons/ri';
import { getRedirectResult } from 'firebase/auth';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase/firebase';
import logo from '../assets/images/logo.png';
import '../theme/css/SignInForm.css';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, googleSignIn, facebookSignIn } = UserAuth();

  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    setIsAuthLoading(true);
    setError('');
    try {
      await signIn(email, password);
    } catch (e) {
      setError(e.message);
      const errorCode = e.code;
      if (
        errorCode === 'auth/invalid-email' ||
        errorCode === 'auth/wrong-password'
      ) {
        setError('  The email address or password you entered is invalid.');
      }
    } finally {
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
      setIsLoading(true);
      getRedirectResult(auth);
    }
  }, []);

  return (
    <div className="signin_section">
      <div>
        <a href="/">
          <img src={logo} className="logo" alt="Bimbeer Logo" />
        </a>
      </div>
      <Box
        pos="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="#141517"
        display={isLoading ? 'flex' : 'none'}
        zIndex={10}
      >
        <Center h="100%" w="100%">
          <Image position="fixed" top={130} src={logo} alt="Bimbeer Logo" />
          <Text fontSize="4xl" mr={4}>
            We&apos;re logging you in, sit tight!
          </Text>
          <Spinner thickness="4px" size="xl" color="white" />
        </Center>
      </Box>
      {error && (
        <Text fontSize="sm" color="red">
          {error}
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
            <a href="/#/sign-up">
              <b>Sign up</b>
            </a>
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
