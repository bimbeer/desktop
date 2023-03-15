/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Text, Spinner, Flex } from '@chakra-ui/react';
import { UserAuth } from '../context/AuthContext';
import '../theme/LoginForm.css';
import logo from '../assets/images/logo.png';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, googleSignIn, facebookSignIn } = UserAuth();

  const logIn = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setError('');
    try {
      await signIn(email, password);
      navigate('/profile');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await googleSignIn();
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
      setIsFacebookLoading(true);
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="login_section">
      <div>
        <a href="/">
          <img src={logo} className="logo" alt="Bimbeer Logo" />
        </a>
      </div>
      <div>
        <form onSubmit={logIn}>
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
          <div className="social-media-login">
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
          <div className="login-button">
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
