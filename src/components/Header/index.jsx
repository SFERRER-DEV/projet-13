import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/argentBankLogo.png';

/**
 * @description L'entête
 * @returns {JSX.Element} Header
 */
function Header() {
  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={logo} alt="logo" />
        </Link>
        <div>
          <i>
            <FontAwesomeIcon icon={faUserCircle} />
          </i>
          <Link to="/signin" className="main-nav-item">
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
