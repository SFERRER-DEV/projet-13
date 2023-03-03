import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connectedSelector } from '../../utils/selectors';
import { useNavigate } from 'react-router-dom';

/**
 * Vérifier que l'utilisateur est authentifié et sinon
 * le rediriger sur la page de connexion
 * @returns {boolean} l'utilisateur connecté est-il authentifié ?
 */
export function useAuthentication() {
  const navigate = useNavigate();
  /**
   * @type {boolean}
   * @description Est-ce que l'utilisateur est connecté ? (A-t-il un jeton et id qui ont été stockés dans le state global)
   */
  const isConnected = useSelector(connectedSelector);

  useEffect(() => {
    console.log(
      `${Date.now()} - useAuthentication - isConnected ? ${isConnected}`
    );

    if (!isConnected) {
      // l'utilisateur est rédirigé vers la page de connexion 👮‍♂️
      navigate(`/signin`);
    }
  }, [isConnected, navigate]);

  return isConnected;
}
