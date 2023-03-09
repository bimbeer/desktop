import React from 'react';
import SignUpForm from '../components/SignUpForm';
import '../theme/Login.css';
import background from '../assets/images/background.jpg';

export default function SignUp() {
  return (
    <section className="page">
      <SignUpForm />
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
