import React from 'react';

import SignUpForm from '../components/SignUp/SignUpForm';
import ThemeBackground from '../components/ThemeBackground';
import '../theme/css/AuthForms.css';

export default function SignUp() {
  return (
    <section className="page">
      <SignUpForm />
      <ThemeBackground />
    </section>
  );
}
