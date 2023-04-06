import React from 'react';
import SignInForm from '../components/Start/SignInForm';
import '../theme/css/AuthForms.css';
import ThemeBackground from '../components/ThemeBackground';

export default function Start() {
  return (
    <section className="page">
      <SignInForm />
      <ThemeBackground />
    </section>
  );
}
