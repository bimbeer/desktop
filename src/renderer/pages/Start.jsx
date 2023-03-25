import React from 'react';
import SignInForm from '../components/SignInForm';
import '../theme/css/Start.css';
import ThemeBackground from '../components/ThemeBackground';

export default function Start() {
  return (
    <section className="page">
      <SignInForm />
      <ThemeBackground />
    </section>
  );
}
