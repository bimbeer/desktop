/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { RiArrowRightLine } from 'react-icons/ri';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './LoginForm.css';
import AuthDetails from './AuthDetails';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      // eslint-disable-next-line promise/always-return
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div className="media-item fb-item">
              <BsFacebook className="icon" alt="Facebook icon" />
            </div>
            <div className="media-item google-item">
              <FcGoogle className="icon" alt="Google Icon" />
            </div>
            <div className="media-item apple-item">
              <AiFillApple className="icon" alt="Apple Icon" />
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
        <AuthDetails />
        <div>
          <div>V1.0.0</div>
        </div>
      </div>
    </div>
  );
}
