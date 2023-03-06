import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchOrUpdateToken, remember } from '../../features/login';
import { fetchOrUpdateProfile, forget } from '../../features/profile';
import {
  loginSelector,
  userIdSelector,
  connectedSelector,
  userCreatedSelector,
} from '../../utils/selectors';
import checkValidity, { updateMessageValidation } from '../../utils/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Neutraliser les info-bulles des contraintes de validation
 * pour qu'elles n'apparaissent pas
 */
const disableBubbleMessages = () => {
  /**
   * @type {NodeListOf<HTMLInputElement>}
   * @description Tous les champs de formulaire qui sont à valider
   */
  const fields = document.querySelectorAll(
    '.formData input[type="email"], input[type="password"]'
  );
  // parcourir les élements du formulaire à valider
  for (let input of fields) {
    // et neutraliser leur info bulle (bubble message)
    input.addEventListener('invalid', (event) => {
      event.preventDefault();
    });
  }
};

/**
 * @description Formulaire de connexion
 * @returns {JSX.Element} Composant Signin
 */
function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /** @typedef {string} userName Le courrier électronique de l'utilisateur saisi dans le champ du formulaire  */
  const [userName, setUserName] = useState('');
  /**
   * @typedef {Object} login
   * @property {string} token Le jeton d'authentification de l'utilisateur stocké dans le state global
   * @property {string} status Permet de suivre l'état de la requête (void, fetching, updating, rejected)
   */
  /** @type {login} */
  const login = useSelector(loginSelector);
  /**
   * @type {string}
   * @description l'identifiant de l'utilisateur stocké dans le state global
   */
  const id = useSelector(userIdSelector);
  /**
   * @type {boolean}
   * @description Est-ce que l'utilisateur est connecté ? (A-t-il un jeton et id qui ont été stockés dans le state global)
   */
  const isConnected = useSelector(connectedSelector);
  /**
   * @typedef createdUser
   * @property {string} status Permet de suivre l'état de la requète
   * @property {string} email Courrier électronique de l'utilisateur créé
   * @property {Date|null} createdAt Date de création
   * @property {string} message Message de succès ou d'échec de création de compte
   */
  /** @type {createdUser} */
  const { status, email, message, createdAt } =
    useSelector(userCreatedSelector);

  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputUsername = useRef();
  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputPassword = useRef();

  // 1️⃣ Lors du premier chargement de formulaire, désactiver les info-bulles de l'API Validation
  useEffect(() => {
    // 💬 Neutraliser le infobulles de l'API HTML
    disableBubbleMessages();

    /** @type {HTMLInputElement} */
    const input = document.querySelector('#remember-me');
    // ☑ L'état de la case "Remember me" dépend de la présence du token dans le Web Storage
    input.checked = login.rememberMe;
    if (status === 'void' && message !== null) {
      // Saisir son courrier électronique
      inputPassword.current.focus();
    } else if (status === 'resolved' && email !== null && createdAt !== null) {
      //  ✅ Afficher le message d'information "User successfully created"
      inputPassword.current.parentNode.setAttribute('data-message', message);
      inputPassword.current.parentNode.setAttribute(
        'data-message-visible',
        true
      );
      // 📝 Remplir le courrier électronique avec celui de l'inscription
      setUserName(email);
      inputUsername.current.value = userName;
      // 👋 Avant la 1ere connexion il faut oublier les informations de profil de l'inscription
      dispatch(forget(null));
      // Saisir mot de passe
      inputPassword.current.focus();
    }
  }, [login, status, message, createdAt, email, userName, dispatch]);

  // 2️⃣ Obtenir le profil de l'utilisateur qui a obtenu un jeton ✅
  useEffect(() => {
    const regex = /^[\w-]+\.[\w-]+\.[\w-]+$/;
    if (login.token !== null && regex.test(login.token)) {
      dispatch(fetchOrUpdateProfile(login.token));
    }
  }, [dispatch, login.token]);

  // 3️⃣ Rediriger l'utilisateur connecté ✅
  useEffect(() => {
    if (isConnected) {
      navigate(`/user/${id}`);
    }
  }, [isConnected, id, navigate]);

  // 4️⃣ Prévenir que l'authentification a échoué ⛔
  if (login.status === 'rejected') {
    updateMessageValidation(
      inputPassword.current,
      'Le compte utilisateur et le mot de passe ne correspondent pas'
    );
  }

  /**
   * Valider le formulaire en testant les contraintes de ses champs
   * @param {*} e
   * @returns {void}
   */
  const signUser = (e) => {
    console.log(`${Date.now()} - signUser()`);
    // Rester sur le formulaire
    e.preventDefault();
    /**
     * @type {boolean}
     * @description est-ce que les champs de formulaire respectent leurs contraintes de validité ?
     */
    const valid = checkValidity();
    if (!valid) {
      // ⛔
      // inputPassword.current.focus();
      return;
    } else {
      /**
       * @type {string}
       * @description Le mot de passe
       */
      const userPassword = inputPassword.current?.value;
      // Obtenir le jeton d'authentification 🤞
      dispatch(fetchOrUpdateToken(userName, userPassword));
    }
  };

  /**
   * Activer ou désactiver la mémorisation du token
   */
  function toggleRememberMe(e) {
    // Mémoriser l'état de la case à cocher dans le state global ☑
    dispatch(remember(e.target.checked));
  }

  return (
    <section className="sign-in-content">
      <i>
        <FontAwesomeIcon icon={faUserCircle} />
      </i>
      <h1>Sign In</h1>
      <form /** onSubmit={(e) => signIn(e)} */>
        <div className="input-wrapper formData">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$"
            required
            className="text-control"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            ref={inputUsername}
          />
        </div>
        <div className="input-wrapper formData">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            minLength="6"
            required
            className="text-control"
            ref={inputPassword}
          />
        </div>
        <div className="input-remember formData">
          <input
            type="checkbox"
            id="remember-me"
            onClick={(e) => toggleRememberMe(e)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          className="sign-in-button"
          type="submit"
          name="sign-in"
          onClick={(e) => signUser(e)}
        >
          Sign In
        </button>
      </form>
      <Link to="/signup">No account? Signup here...</Link>
    </section>
  );
}

export default Signin;
