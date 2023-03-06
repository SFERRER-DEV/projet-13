import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfileSelector } from '../../utils/selectors';
import { useAuthentication } from '../../utils/hooks';
import Profile from '../../components/Profile';
import { Loader } from '../../utils/style/Atoms';
import styled from 'styled-components';
import './profilepage.css';

/** @type {Object} Le conteneur pour afficher le profil utilisateur est une balise `<div>` */
const Container = styled.div`
  display: ${({ collapse }) => (collapse === true ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  > p {
    margin-block-start: 0.25em;
    margin-block-end: 0.25em;
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
  justify-content: center;
`;

/**
 * @description Page utilisateur
 * @returns {JSX.Element} La page User
 */
function ProfilePage() {
  const dispatch = useDispatch();
  // 👮‍♂️ Vérifier que l'utilisateur qui accède à la page est connecté, sinon il sera redirigé par ce hook 🚨
  useAuthentication();
  /**
   * @typedef profile
   * @property {string} firstName Prénom de l'utilisateur stocké dans le state global
   * @property {string} lastName Nom de famille de l'utilisateur
   */
  /** @type {profile} */
  const { firstName, lastName, status, error, message } = useSelector((state) =>
    userProfileSelector(state)
  );

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
        <h1>Welcome back</h1>
        {isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <React.Fragment>
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
    </main>
  );
}

export default ProfilePage;
