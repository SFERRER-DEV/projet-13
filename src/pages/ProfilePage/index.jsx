import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userProfileSelector } from '../../utils/selectors';
import { useAuthentication } from '../../utils/hooks';
import Profile from '../../components/Profile';
import Account from '../../components/Account';
import { Loader } from '../../utils/style/Atoms';
import styled from 'styled-components';
import { accountsList } from './accounts';
/** @typedef {import('./accounts').account} account Raccourci pour importer un type */

/** @type {Object} Le conteneur pour afficher le profil utilisateur est une balise `<div>` */
const Container = styled.div`
  display: ${({ collapse }) => (collapse === true ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  > p {
    margin-block-start: 0;
    margin-block-end: 0.83em;
    font-size: 1.25em;
    font-weight: bold;
    width: 100%;
  }
  > button {
    max-width: fit-content;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  padding-top: 1em;
  justify-content: center;
`;

/**
 * @description Page utilisateur
 * @returns {JSX.Element} La page User
 */
function ProfilePage() {
  /**
   * @typedef profile
   * @property {string} firstName Prénom de l'utilisateur stocké dans le state global
   * @property {string} lastName Nom de famille de l'utilisateur
   */
  /** @type {profile} */
  const { firstName, lastName, status } = useSelector((state) =>
    userProfileSelector(state)
  );

  // 👮‍♂️ Vérifier que l'utilisateur qui accède à la page est connecté, sinon il sera redirigé par ce hook 🚨
  useAuthentication(status);

  const [collapse, setCollapse] = useState(false);

  /**
   * Montrer le formulaire pour éditer le profil
   * et cacher le patronyme de bienvenue
   * @param {*} e
   * @returns {void}
   */
  const showEditName = (e) => {
    // Cacher le patronyme
    setCollapse(true);
  };

  /** @type {boolean} Est-ce que les données asynchrones sont maintenant disponibles ?*/
  const isLoading =
    status === 'void' || status === 'pending' || status === 'updating';

  return (
    <main className="main bg-dark">
      <section className="header">
        {isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <React.Fragment>
            <h1>Welcome back</h1>
            <Container collapse={collapse}>
              <p>
                {firstName} {lastName} !
              </p>
              <button className="edit-button" onClick={(e) => showEditName(e)}>
                Edit Name
              </button>
            </Container>
            <Profile
              firstName={firstName}
              lastName={lastName}
              collapse={!collapse}
              setCollapse={setCollapse}
            />
          </React.Fragment>
        )}
      </section>
      {isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <section>
          <h2 className="sr-only">Accounts</h2>
          {accountsList.map(
            (/** @type {account}*/ { title, description, amount }, index) => (
              <Account
                key={`account-${1000 + index}`}
                title={title}
                amount={amount}
                description={description}
              />
            )
          )}
        </section>
      )}
    </main>
  );
}

export default ProfilePage;
