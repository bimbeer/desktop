import React from 'react';
import SignUpForm from '../components/SignUpForm';
import ThemeBackground from '../components/ThemeBackground';
import '../theme/css/Start.css';

export default function SignUp() {
  return (
    <section className="page">
      <SignUpForm />
      <ThemeBackground />
    </section>
  );
}
