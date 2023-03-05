import React from 'react';

/**
 * @description Composant Welcome back
 * @param {Object} props
 * @param {string} props.firstName
 * @param {string} props.lastName
 * @returns {JSX.Element} Un composant Welcome
 */
function Welcome(props) {
  /**
   * @typedef user
   * @property {string} firstName Prénom utilisateur obtenu depuis les props
   * @property {string} lastName Nom de famille utilisateur obtenu depuis les props
   */
  /** @type {user} */
  const { firstName, lastName } = props;

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        <span>{firstName}</span>
        <span>{lastName}</span>
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default Welcome;
