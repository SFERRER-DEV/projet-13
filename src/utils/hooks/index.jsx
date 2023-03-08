import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connectedSelector } from '../../utils/selectors';
import { useNavigate } from 'react-router-dom';

/**
 * Vérifier que l'utilisateur est authentifié et sinon
 * le rediriger sur la page de connexion
 * @param {string} status Permet de suivre l'état de la requête
 * @returns {boolean} l'utilisateur connecté est-il authentifié ?
 */
export function useAuthentication(status) {
  const navigate = useNavigate();
  /**
   * @type {boolean}
   * @description Est-ce que l'utilisateur est connecté ? (A-t-il un jeton et id qui ont été stockés dans le state global)
   */
  const isConnected = useSelector(connectedSelector);

  console.log(`${Date.now()} - useAuthentication - status ? ${status}`);

  /** @type {boolean} Est-ce que les données asynchrones sont maintenant disponibles ?*/
  const isLoading =
    status === 'void' || status === 'pending' || status === 'updating';

  useEffect(() => {
    console.log(
      `${Date.now()} - useAuthentication - isConnected ? ${isConnected}`
    );

    if (!isLoading && !isConnected) {
      // 🚨 l'utilisateur est rédirigé vers la page de connexion 👮‍♂️
      navigate(`/signin`);
    }
  }, [isLoading, isConnected, navigate]);

  return isConnected;
}
