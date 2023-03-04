import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
    '.formData input[type="email"], input[type="password"], input[type="text"]'
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
 * @description Formulaire de connexion
 * @returns {JSX.Element} Composant Signin
 */
function Signup() {
  /** @typedef {string} userName Le courrier électronique de l'utilisateur saisi dans le champ du formulaire  */
  const [userName, setUserName] = useState('');

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
      //
    }
  };

  return (
    <section className="sign-in-content">
      <i>
        <FontAwesomeIcon icon={faUserCircle} />
      </i>
      <h1>Sign Up</h1>
      <form /** onSubmit={(e) => signUser(e)} */>
        <div className="input-wrapper formData">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            required
            className="text-control"
            minLength="2"
          />
        </div>
        <div className="input-wrapper formData">
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            required
            className="text-control"
            minLength="2"
          />
        </div>
        <div className="input-wrapper formData">
          <label htmlFor="username">User Mail</label>
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
            required
            className="text-control"
            minLength="6"
          />
        </div>
        <input
          className="sign-in-button"
          type="submit"
          value="Sign Up"
          onClick={(e) => signUser(e)}
        />
      </form>
      <Link to="/signin">
        You have an account?
        <br /> Signin here...
      </Link>
    </section>
  );
}

export default Signup;
