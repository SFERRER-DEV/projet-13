import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getSessionStorageToken = () => {
  // Détection de la possibilité de faire un stockage local via sessionStorage
  if (typeof sessionStorage != 'undefined') {
    /// Récupération de la valeur du token depuis le stockage sessionStorage
    let token = sessionStorage.getItem('token');
    /* Vérification de la présence du compteur de visite(s) */
    if (token !== null) {
      return token;
    }
    return null;
  } else {
    //  Message d'erreur (pas de possibilité de stockage sessionStorage)
    console.log("sessionStorage n'est pas supporté");
  }
};

const initialState = {
  // permet de suivre l'état de la requête
  status: getSessionStorageToken() === null ? 'void' : 'resolved',
  // TODO: Récuperer le token depuis le session storage ou le localStorage
  token: getSessionStorageToken(),
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
        return;
      }
      return;
    },
    // Action memorise Web Storage 👌
    memo: (draft, action) => {
      if (draft.status === 'resolved' && draft.token === action.payload) {
        // Stockage dans le stockage sessionStorage
        sessionStorage.setItem('token', action.payload);
        return;
      }
    },
  },
});

// Extraire les actions
const { fetching, resolved, rejected } = actions;
export const { deconnect, memo } = actions;

export default reducer;
