import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './signin.css';

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
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const inputName = useRef();
  const inputPassword = useRef();

  const [formValidator, setFormValidator] = useState(false);

  useEffect(() => {
    disableBubbleMessages();
  }, []);

  useEffect(() => {
    console.log(`userName ${userName}`);
  }, [userName]);

  /**
   *
   * @param {*} e
   * @returns
   */
  const signIn = (e) => {
    // Rester sur le formulaire en erreur
    e.preventDefault();

    if (checkValidity()) {
      setFormValidator(true);
    } else {
      setFormValidator(false);
    }

    if (!formValidator) {
      // Rester sur le formulaire en erreur
      //inputPassword.current.focus()
      e.preventDefault();
      return;
    } else {
      console.log(`inputName ${inputName.current.value}`);
      console.log(`inputPassword ${inputPassword.current.value}`);
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
            ref={inputName}
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
          onClick={(e) => signIn(e)}
        >
          Sign In
        </button>
      </form>
      <Link to="/signup">No account? Signup here...</Link>
    </section>
  );
}

export default Signin;
