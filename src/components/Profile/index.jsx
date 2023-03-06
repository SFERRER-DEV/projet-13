import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, cleanMessage } from '../../features/profile';
import { loginSelector, userProfileSelector } from '../../utils/selectors';
import checkValidity, { updateMessageValidation } from '../../utils/form';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/** @type {Object} Le conteneur pour éditer le profil utilisateur est une balise `<form>` */
const Container = styled.form`
  display: ${({ collapse }) => (collapse === true ? 'none' : 'flex')};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .input-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 49%;
  }
  div.input-wrapper:first-of-type {
    align-content: flex-end;
  }
  div.input-wrapper:last-of-type {
    align-content: flex-start;
  }
  .input-wrapper .text-control {
    width: 65%;
  }
  > button {
    min-width: fit-content;
    width: 15%;
    font-size: 1.2em;
  }
`;

/**
 * @description Composant pour éditer le profil utilisateur
 * @returns {JSX.Element} Un composant Profile
 */
function Profile(props) {
  /**
   * @typedef Props
   * @property {string} firstName Prénom utilisateur obtenu depuis les props
   * @property {string} lastName Nom de famille utilisateur obtenu depuis les props
   * @property {boolean} collapse Définir si le formulaire pour éditer le profile est visible
   * @property {function} setCollapse
   */
  /** @type {Props} */
  const { firstName, lastName, collapse, setCollapse } = props;

  const dispatch = useDispatch();

  /**
   * @typedef {number} seconds Nombre de seconde(s) à attendre
   */
  const [
    /** @type {seconds} */
    seconds,
    setSeconds,
  ] = useState(0); // 3s
  /**
   * @typedef {string} token le jeton d'authentification de l'utilisateur stocké dans le state global
   */
  const { token } = useSelector(loginSelector);
  /**
   * @typedef profile
   * @property {Object} updatedAt Datetime de mise à jour du champ en base de données
   * @property {string} status Permet de suivre l'état de la requête
   */
  /** @type {profile} */
  const { status, message, error } = useSelector((state) =>
    userProfileSelector(state)
  );

  /*
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
  const formMessageOk = useRef();
  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const save = useRef();
  /**
   * @type {Object}
   * @description Référence vers un élément du DOM
   */
  const cancel = useRef();

  useEffect(() => {
    if (message === null) {
      // 🧽 Effacer un précédent message affiché
      formMessageOk.current.setAttribute('data-message', '');
      formMessageOk.current.setAttribute('data-message-visible', true);
      // 📄 Déprotéger les éléments du formulaire
      inputFirstname.current.removeAttribute('readonly');
      inputLastname.current.removeAttribute('readonly');
      save.current.removeAttribute('disabled');
      cancel.current.removeAttribute('disabled');
    } else if (status === 'resolved' && error === null && message !== null) {
      // ✅ Afficher le message d'information "User successfully created"
      formMessageOk.current.setAttribute('data-message', message);
      formMessageOk.current.setAttribute('data-message-visible', true);
      // 🔒 Protéger les éléments du formulaire
      inputFirstname.current.setAttribute('readonly', 'readonly');
      inputLastname.current.setAttribute('readonly', 'readonly');
      save.current.setAttribute('disabled', 'disabled');
      cancel.current.setAttribute('disabled', 'disabled');
      // ⏳ Laisser le message quelques secondes à l'écran
      setSeconds(1);
    }
  }, [status, error, message, setCollapse]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      } else {
        if (message !== null) {
          // ⏰ L'attente pour l'affichage du message informatif est terminée
          setCollapse(false);
          // 🧹 Enlever ce message informatif du State global
          dispatch(cleanMessage());
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, message, setCollapse, dispatch]);

  const updateUser = (e) => {
    // Rester sur le formulaire
    e.preventDefault();

    /**
     * @type {boolean}
     * @description est-ce que les champs de formulaire respectent leurs contraintes de validité ?
     */
    const valid = checkValidity();
    if (!valid) {
      // ⛔
      return;
    } else {
      // 📝 Mettre à jour le profil de l'utilisateur
      dispatch(
        updateProfile(
          token,
          inputFirstname.current?.value,
          inputLastname.current?.value
        )
      );
    }
  };

  return (
    <Container collapse={collapse}>
      <div className="input-wrapper formData">
        <input
          type="text"
          id="firstname"
          minLength="2"
          required
          className="text-control"
          placeholder={firstName}
          ref={inputFirstname}
        />
      </div>
      <div className="input-wrapper formData">
        <input
          type="text"
          id="lastname"
          minLength="2"
          required
          className="text-control"
          placeholder={lastName}
          ref={inputLastname}
        />
      </div>
      <div className="formData" ref={formMessageOk}>
        <button type="button" onClick={(e) => updateUser(e)} ref={save}>
          Save
        </button>
        <button type="button" onClick={() => setCollapse(false)} ref={cancel}>
          Cancel
        </button>
      </div>
    </Container>
  );
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  collapse: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  collapse: false,
};

export default Profile;
