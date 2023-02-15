import React from 'react';

/**
 * @description Pied de page
 * @returns {JSX.Element} Footer
 */
function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        Copyright {new Date().getFullYear()} Argent Bank
      </p>
    </footer>
  );
}

export default Footer;
