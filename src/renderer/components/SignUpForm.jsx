/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { UserAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import '../theme/css/LoginForm.css';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/dashboard');
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
        <form onSubmit={signUp}>
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
          <Text fontSize="sm" color="white">
            Already have an account?{` `}
            <a href="/">
              <b>Log In</b>
            </a>
          </Text>
          <div className="login-button">
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
