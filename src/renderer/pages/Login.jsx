import React from 'react';
import LoginForm from '../components/LoginForm';
import './Login.css';

export default function Login() {
  return (
    <section className="page">
      <LoginForm />
      <div className="img_login_section">
        <img
          className="background_img"
          src="https://static.theceomagazine.net/wp-content/uploads/2019/11/25131105/worlds-most-expensive-beer.jpg"
          alt="Beer background"
        />
      </div>
    </section>
  );
}
