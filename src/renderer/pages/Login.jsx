import React from 'react';
import LoginForm from '../components/LoginForm';
import '../theme/css/Login.css';
import ThemeBackground from '../components/ThemeBackground';

export default function Login() {
  return (
    <section className="page">
      <LoginForm />
      <ThemeBackground />
    </section>
  );
}
