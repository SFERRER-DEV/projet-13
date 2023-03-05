import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfileSelector } from '../../utils/selectors';
import { useAuthentication } from '../../utils/hooks';
import Welcome from '../../components/Welcome';
import './profilepage.css';
/**
 * @description Page utilisateur
 * @returns {JSX.Element} La page User
 */
function ProfilePage() {
  // 👮‍♂️ Vérifier que l'utilisateur qui accède à la page est connecté, sinon il sera redirigé par ce hook 🚨
  useAuthentication();
  /**
   * @typedef profile
   * @property {string} firstName Prénom de l'utilisateur stocké dans le state global
   * @property {string} lastName Nom de famille de l'utilisateur
   */
  /** @type {profile} */
  const { firstName, lastName } = useSelector((state) =>
    userProfileSelector(state)
  );

  return (
    <main className="main bg-dark">
      <Welcome firstName={firstName} lastName={lastName} />
    </main>
  );
}

export default ProfilePage;
