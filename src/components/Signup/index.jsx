import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createProfile } from '../../features/profile';
import { userFailedSelector } from '../../utils/selectors';
import checkValidity, { updateMessageValidation } from '../../utils/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * @description Formulaire de connexion
 * @returns {JSX.Element} Composant Signin
 */
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /** @typedef {string} userName Le courrier électronique de l'utilisateur saisi dans le champ du formulaire  */
  const [userName, setUserName] = useState('');

  const { status, message, error } = useSelector((state) =>
    userFailedSelector(state)
  );

  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputFirstname = useRef();
  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputLastname = useRef();
  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputPassword = useRef();
  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const inputUsername = useRef();

  useEffect(() => {
    // ✋ L'email saisi est utilisé par un autre compte
    if (status === 'rejected' && error !== null) {
      inputUsername.current.focus();
      inputUsername.current.setCustomValidity(message);
      // Marquer le champ en erreur avec le message obtenu depuis la réponse du backend
      updateMessageValidation(inputUsername.current, message);
    }
  }, [status, message, error]);
  /**
   * Valider le formulaire en testant les contraintes de ses champs
   * @param {Object} e L'objet évènement
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
      const userFirstname = inputFirstname.current?.value;
      /**
       * @type {string}
       * @description Le mot de passe
       */
      const userLastname = inputLastname.current?.value;
      /**
       * @type {string}
       * @description Le mot de passe
       */
      const userPassword = inputPassword.current?.value;
      //
      dispatch(
        createProfile(userFirstname, userLastname, userName, userPassword)
      );
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
            ref={inputFirstname}
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
            ref={inputLastname}
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
            ref={inputUsername}
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
            ref={inputPassword}
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
