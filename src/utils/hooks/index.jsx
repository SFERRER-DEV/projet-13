import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { hasToken } from '../../utils/selectors';
import { useNavigate } from 'react-router-dom';

/**
 * Vérifier que l'utilisateur est authentifié et sinon
 * le rediriger sur la page de connexion
 * @param {string} status Permet de suivre l'état de la requête
 * @returns {boolean} l'utilisateur connecté est-il authentifié ?
 */
export function useAuthentication(status) {
  const navigate = useNavigate();

  /** @type {boolean} Est-ce que l'utilisateur a obtenu un token valide ? */
  const authenticated = useSelector(hasToken);

  /** @type {boolean} Est-ce que les données asynchrones sont maintenant disponibles ?*/
  const isLoading =
    (status === 'pending' || status === 'updating') & (status !== 'void');

  useEffect(() => {
    if (!isLoading && !authenticated) {
      console.warn(
        `${Date.now()} - useAuthentication - authenticated ? ${authenticated}`
      );
      // 🚨 l'utilisateur est rédirigé vers la page de connexion 👮‍♂️
      navigate(`/signin`);
    }
  }, [isLoading, authenticated, navigate, status]);

  return null;
}
