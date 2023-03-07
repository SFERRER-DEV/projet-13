import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/argentBankLogo.png';
import './header.css';
import { deconnect } from '../../features/login';
import { fetchOrUpdateProfile, forget } from '../../features/profile';
import {
  connectedSelector,
  userProfileSelector,
  loginSelector,
  userIdSelector,
} from '../../utils/selectors';
/**
 * @description L'entête
 * @returns {JSX.Element} Header
 */
function Header() {
  const dispatch = useDispatch();
  /**
   * @typedef {string} token le jeton d'authentification de l'utilisateur stocké dans le state global
   */
  const { token } = useSelector(loginSelector);
  /**
   * @type {string}
   * @description l'identifiant de l'utilisateur stocké dans le state global
   */
  const id = useSelector(userIdSelector);
  /**
   * @typedef {string} firstName le prénom de l'utilisateur stocké dans le state global
   */
  const { firstName } = useSelector((state) => userProfileSelector(state));
  /**
   * @type {boolean}
   * @description l'utilisateur est-il connecté et authentifié ?
   */
  const isConnected = useSelector(connectedSelector);

  // Obtenir le profil de l'utilisateur à partir du jeton ✅
  useEffect(() => {
    const regex = /^[\w-]+\.[\w-]+\.[\w-]+$/;
    if (token !== null && regex.test(token)) {
      dispatch(fetchOrUpdateProfile(token));
    }
  }, [dispatch, token]);

  /**
   * Oublier les informations de l'utilisateur connecté et
   * déconnecter l'utilisateur en enlevant son jeton
   * du state global et du sessionStorage 👋
   * @param {Object} e
   * @param {string} id identifiant de l'utilisateur
   * @param {string} token jeton d'authentification de l'utilisateur
   */
  function signOutUser(e, id, token) {
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
            <Link to={`/profile`} className="main-nav-item">
              <i>
                <FontAwesomeIcon icon={faUserCircle} />
              </i>
              {firstName}
            </Link>
            <Link
              to="/"
              className="main-nav-item"
              onClick={(e) => signOutUser(e, id, token)}
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
