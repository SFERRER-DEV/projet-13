import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './signin.css';
import { fetchOrUpdateToken } from '../../features/login';
import { fetchOrUpdateProfile } from '../../features/profile';
import {
  loginSelector,
  userIdSelector,
  connectedSelector,
} from '../../utils/selectors';

/**
 * Tester tous les champs du formulaire à valider
 */
const checkValidity = () => {
  /**
   * @type {boolean}
   * @description Est-ce que le formulaire et tous ses champs sont valides ?
   */
  let ok = true;
  /**
   * @type {NodeListOf<HTMLInputElement>}
   * @description Tous les champs de formulaire qui sont à valider
   */
  const fields = document.querySelectorAll(
    '.formData input[type="email"], input[type="password"], input[type="checkbox"]'
  );
  // parcourir les élements du formulaire à valider
  for (let input of fields) {
    ok &= validateField(input);
  }
  return ok;
};

/**
 * Tester si un champ de formulaire a des erreurs de validation
 * @param {HTMLInputElement} field
 * @returns {boolean} Ce champ est-il validé ?
 */
const validateField = (field) => {
  /**
   * @type {Object}
   * @description Les états de validité de toutes les contraintes d'un champ de formulaire
   */
  const validityState = field.validity;
  resetValidation(field);
  if (!validityState.valid) {
    updateMessageValidation(field, field.validationMessage);
  }
  return validityState.valid;
};

/**
 * Remise à blanc des erreurs de validation d'un champ
 * @param {HTMLInputElement} field
 */
const resetValidation = (field) => {
  /** @type {HTMLDivElement} */
  const formData = field.parentNode;
  if (formData.classList.contains('formData')) {
    formData.setAttribute('data-error', '');
    formData.setAttribute('data-error-visible', false);
    field.setCustomValidity('');
  }
};

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
 * Marquer un champ en erreur et afficher son message d'erreur de validation
 * @param {HTMLInputElement} field
 * @param {string} message
 */
const updateMessageValidation = (field, message) => {
  /** @type {HTMLDivElement} */
  const formData = field.parentNode;
  if (formData.classList.contains('formData')) {
    formData.setAttribute('data-error', message);
    formData.setAttribute('data-error-visible', true);
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
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputPassword = useRef();

  // Lors du premier chargement de formulaire, désactiver les info-bulles de l'API Validation
  useEffect(() => {
    disableBubbleMessages();
  }, []);

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
      // 1️⃣ Obtenir le jeton d'authentification 🤞
      dispatch(fetchOrUpdateToken(userName, userPassword));
    }
  };

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
          <input type="checkbox" id="remember-me" />
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
