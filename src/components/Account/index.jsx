import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Afficher un compte bancaire dans une div
 * @param {Object} props
 * @param {string} props.title Titre du compte
 * @param {string} props.amount Montant du compte
 * @param {string} props.description Description du compte
 * @returns {JSX.Element} Account
 */
function Account(props) {
  const { title, amount, description } = props;
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">
          {amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

Account.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Account;
