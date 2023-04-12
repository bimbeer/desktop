import React from 'react';

import background from '../assets/images/background.jpg';
import '../theme/css/Start.css';

export default function ThemeBackground() {
  return (
    <div className="img_login_section">
      <img className="background_img" src={background} alt="Beer background" />
    </div>
  );
}
