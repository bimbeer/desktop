import React from 'react';
import LoginForm from '../components/LoginForm';
import '../theme/Login.css';
import background from '../assets/images/background.jpg';

export default function Login() {
  return (
    <section className="page">
      <LoginForm />
      <div className="img_login_section">
        <img
          className="background_img"
          src={background}
          alt="Beer background"
        />
      </div>
    </section>
  );
}
