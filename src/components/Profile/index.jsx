import React, { useRef } from 'react';
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
   * @typedef propsProfile
   * @property {string} firstName Prénom utilisateur obtenu depuis les props
   * @property {string} lastName Nom de famille utilisateur obtenu depuis les props
   * @property {boolean} collapse Définir si le formulaire pour éditer le profile est visible
   * @property {function} setCollapse
   */
  /** @type {propsProfile} */
  const { firstName, lastName, collapse, setCollapse } = props;
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
      <button type="submit">Save</button>
      <button type="button" onClick={() => setCollapse(false)}>
        Cancel
      </button>
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
