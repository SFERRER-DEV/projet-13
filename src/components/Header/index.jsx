import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/argentBankLogo.png';
import './header.css';
import { deconnect } from '../../features/token';
import { forget } from '../../features/profile';
import {
  connectedSelector,
  userProfileSelector,
  tokenSelector,
  userIdSelector,
} from '../../utils/selectors';
/**
 * @description L'entête
 * @returns {JSX.Element} Header
 */
function Header() {
  const dispatch = useDispatch();
  /**
   * @type {boolean}
   * @description l'utilisateur est-il connecté et authentifié ?
   */
  const isConnected = useSelector(connectedSelector);
  const { firstName } = useSelector((state) => userProfileSelector(state));
  /**
   * @type {string}
   * @description le jeton d'authentification de l'utilisateur stocké dans le state global
   */
  const { token } = useSelector(tokenSelector);
  /**
   * @type {string}
   * @description l'identifiant de l'utilisateur stocké dans le state global
   */
  const id = useSelector(userIdSelector);

  /**
   * Oublier les informations de l'utilisateur connecté et
   * déconnecter l'utilisateur en enlevant du state global son jeton
   * @param {string} id identifiant de l'utilisateur
   * @param {string} token jeton d'authentification de l'utilisateur
   */
  function signOutUser(id, token) {
    if (id !== null && token !== null) {
      dispatch(forget(id));
      dispatch(deconnect(token));
    }
  }

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={logo} alt="logo" />
        </Link>
        {isConnected ? (
          <div>
            <Link to={`user/${id}`} className="main-nav-item">
              <i>
                <FontAwesomeIcon icon={faUserCircle} />
              </i>
              {firstName}
            </Link>
            <Link
              to="/"
              className="main-nav-item"
              onClick={() => signOutUser(id, token)}
            >
              <i>
                <FontAwesomeIcon icon={faSignOut} />
              </i>
              Sign Out
            </Link>
          </div>
        ) : (
          <Link to="/signin" className="main-nav-item">
            <i>
              <FontAwesomeIcon icon={faUserCircle} />
            </i>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
