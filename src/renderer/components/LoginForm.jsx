import React, { useState } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { RiArrowRightLine } from 'react-icons/ri';
import { Text } from '@chakra-ui/react';
import './LoginForm.css';

export default function Login() {
  const [dataUser, setDataUser] = useState({
    username: '',
    password: '',
    save_login: false,
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    setDataUser({
      ...dataUser,
      [name]: checked || value,
    });
  };

  console.log(dataUser);

  return (
    <div className="login_section">
      <div>
        <img
          src="https://i.imgur.com/AjNUvAg.png"
          className="logo"
          alt="Bimbeer Logo"
        />
      </div>
      <Text fontSize="lg" color="white">
        Log in and find yourself a drinking buddy!
      </Text>
      <div>
        <form>
          <div className="input_field">
            <input
              type="text"
              onChange={(e) => handleInputChange(e)}
              name="username"
              id="username"
              required
              value={dataUser.username}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input_field">
            <input
              type="password"
              onChange={(e) => handleInputChange(e)}
              name="password"
              id="password"
              required
              value={dataUser.password}
            />
            <label htmlFor="password">Password</label>
          </div>
        </form>

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
      </div>

      <div className="login-button">
        <RiArrowRightLine className="icon" />
      </div>

      <div className="other-actions">
        <div>
          <div>V1.0.0</div>
        </div>
      </div>
    </div>
  );
}
