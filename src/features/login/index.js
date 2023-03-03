import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Obtenir le token stocké dans le sessionStorage
 * @returns {string|null} token d'authentification
 */
const getSessionStorageToken = () => {
  // Détection de la possibilité de faire un stockage local via sessionStorage
  if (typeof sessionStorage != 'undefined') {
    /// Récupération de la valeur du token depuis le stockage sessionStorage
    const token = sessionStorage.getItem('token');
    // Vérification de la présence du token
    if (token !== null) {
      return token;
    }
    return null;
  } else {
    //  Message d'erreur (pas de possibilité de stockage sessionStorage)
    console.log("sessionStorage n'est pas supporté");
  }
};

/**
 * Obtenir le token pérsistant stocké dans le localStorage
 * @returns {string|null} token d'authentification
 */
const getLocalStorageToken = () => {
  // Détection de la possibilité de faire un stockage local via localStorage
  if (typeof localStorage != 'undefined') {
    /// Récupération de la valeur du token depuis le stockage localStorage
    const token = localStorage.getItem('token');
    //  Vérification de la présence du token
    if (token !== null) {
      return token;
    }
    return null;
  } else {
    //  Message d'erreur (pas de possibilité de stockage localStorage)
    console.log("localStorage n'est pas supporté");
  }
};

const initialState = {
  // permet de suivre l'état de la requête
  status:
    getLocalStorageToken() !== null || getSessionStorageToken() !== null
      ? 'resolved'
      : 'void',
  // Si le token d'authentification est dans le Web Storage alors rememberMe est activé ☑
  rememberMe: localStorage.getItem('token') !== null || false,
  // TODO: Récupérer le token depuis le sessionStorage ou le localStorage
  token:
    (getLocalStorageToken() !== null) === true
      ? getLocalStorageToken()
      : getSessionStorageToken(),
  // l'erreur lorsque la requête échoue
  error: null,
};

/**
 * Authentifier l'utilisateur pour obtenir son jeton
 * et conserver le jeton obtenu dans le Web Storage
 * @param {string} email
 * @param {string} password
 * @returns {void}
 */
export const fetchOrUpdateToken = (email, password) => {
  return async (dispatch, getState) => {
    // Régler le statut de départ 🏁
    dispatch(fetching());
    // Obtenir le jeton d'un compte utilisateur 👮‍♂️
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        { email, password }
      );
      const token = await response.data.body.token;
      // 1️⃣ Le token a été trouvé ✅
      dispatch(resolved(token));
      // 2️⃣ Conserver le token dans le Web Storage 👌
      dispatch(memo(token));
    } catch (error) {
      console.log(error);
      dispatch(rejected(error.message));
    }
  };
};

/**
 * Reducer et Actions avec Redux Toolkit createSlice()
 * @param {string} name - Nom du reducer
 * @param {object} initialState - Le state initial du reducer
 * @param {object} reducers - Les actions creator
 * @returns Actions
 * @returns Reducer
 */
const { actions, reducer } = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Action fetching 🤞
    fetching: (draft, action) => {
      if (draft.status === 'void') {
        draft.status = 'pending';
        return;
      }
      if (draft.status === 'rejected') {
        draft.error = null;
        draft.status = 'pending';
        return;
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating';
        return;
      }
      return;
    },
    // Action resolved 👍
    resolved: {
      reducer: (draft, action) => {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.status = 'resolved';
          draft.token = action.payload;
          // Oublier le token pérsistant quand la case n'est pas cochée
          if (!draft.rememberMe) {
            localStorage.removeItem('token');
          }
          return;
        }
        return;
      },
    },
    // Action rejected 👎
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload;
        draft.token = null;
        draft.status = 'rejected';
        return;
      }
      return;
    },
    // Action deconnect 👋
    deconnect: (draft, action) => {
      if (draft.status === 'resolved' && draft.token === action.payload) {
        draft.token = null;
        draft.status = 'void';
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        return;
      }
      return;
    },
    // Action memorise Web Storage 👌
    memo: (draft, action) => {
      if (draft.status === 'resolved' && draft.token === action.payload) {
        // Stocker le token dans le Web Storage ☑
        //  🅰  Mémoriser le temps d'une session
        sessionStorage.setItem('token', action.payload);
        if (draft.rememberMe) {
          // 🅱 Mémoriser aussi de manière pérsitante
          localStorage.setItem('token', action.payload);
        }
        return;
      }
    },
    // Action remember token ☑
    remember: (draft, action) => {
      // Mémoriser l'état de la case à cocher lors du login
      draft.rememberMe = action.payload;
    },
  },
});

// Extraire les actions
const { fetching, resolved, rejected } = actions;
export const { deconnect, memo, remember } = actions;

export default reducer;
