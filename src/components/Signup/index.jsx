import { Link } from 'react-router-dom';
import { useState } from 'react';
import checkValidity, { updateMessageValidation } from '../../utils/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
