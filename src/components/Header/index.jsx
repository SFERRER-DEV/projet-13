import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/argentBankLogo.png';
import styled from 'styled-components';
import { deconnect } from '../../features/login';
import { fetchOrUpdateProfile, forget } from '../../features/profile';
import {
  hasToken,
  connectedSelector,
  userProfileSelector,
  loginSelector,
  userIdSelector,
} from '../../utils/selectors';
import { Loader } from '../../utils/style/Atoms';

/** @type {Object} Conteneur d'icône avec une marge dans une balise`<di>` */
const Icon = styled.i`
  margin: 0 0.5em;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20em;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 20em;
`;

/**
 * @description L'entête
 * @returns {JSX.Element} Header
 */
function Header() {
  const dispatch = useDispatch();

  /** @type {boolean} Est-ce que l'utilisateur a obtenu un token valide ? */
  const authenticated = useSelector(hasToken);
  /**
   * @type {string} token
   * @description Jeton d'authentification de l'utilisateur stocké dans le state global
   */
  const token = useSelector((state) => loginSelector(state).token);
  /**
   * @type {string}
   * @description l'identifiant de l'utilisateur stocké dans le state global
   */
  const id = useSelector(userIdSelector);
  /**
   * @typedef {string} firstName le prénom de l'utilisateur stocké dans le state global
   */
  const { firstName, status } = useSelector((state) =>
    userProfileSelector(state)
  );

  /**
   * @type {boolean}
   * @description l'utilisateur est-il connecté et authentifié ?
   */
  const isConnected = useSelector(connectedSelector);
  /** @type {boolean} Est-ce que les données asynchrones sont maintenant disponibles ? */
  const isLoading = status === 'pending' || status === 'updating';

  // 🧐 Obtenir le profil de l'utilisateur
  useEffect(() => {
    if (authenticated) {
      // Appeler l'API avec un jeton valide
      dispatch(fetchOrUpdateProfile(token));
    }
  }, [authenticated, token, dispatch]);

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
        {isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : isConnected ? (
          <Container>
            <Link to={`/profile`} className="main-nav-item">
              <Icon>
                <FontAwesomeIcon icon={faUserCircle} />
              </Icon>
              {firstName}
            </Link>
            <Link
              to="/"
              className="main-nav-item"
              onClick={(e) => signOutUser(e, id, token)}
            >
              <Icon>
                <FontAwesomeIcon icon={faSignOut} />
              </Icon>
              Sign Out
            </Link>
          </Container>
        ) : (
          <Container>
            <Link to="/signin" className="main-nav-item">
              <Icon>
                <FontAwesomeIcon icon={faUserCircle} />
              </Icon>
              Sign In
            </Link>
          </Container>
        )}
      </nav>
    </header>
  );
}

export default Header;
