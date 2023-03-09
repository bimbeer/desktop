/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import '../theme/LoginForm.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, googleSignIn } = UserAuth();

  const logIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/profile');
      // eslint-disable-next-line no-shadow
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/profile');
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="login_section">
      <div>
        <img
          src="https://i.imgur.com/AjNUvAg.png"
          className="logo"
          alt="Bimbeer Logo"
        />
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
              <button type="button" onClick={handleGoogleSignIn}>
                <FcGoogle className="icon" alt="Google Icon" />
              </button>
            </div>
            <div className="media-item fb-item">
              <BsFacebook className="icon" alt="Facebook icon" />
            </div>
          </div>
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
