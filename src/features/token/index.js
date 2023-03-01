import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  // permet de suivre l'état de la requête
  status: 'void',
  token: null,
  // l'erreur lorsque la requête échoue
  error: null,
};

/**
 * Authentifier l'utilisateur pour obtenir son jeton ou oublier un jeton obtenu pour se déconnecter
 * @param {string} email
 * @param {string} password
 * @returns {void}
 */
export function fetchOrUpdateToken(email, password) {
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
      dispatch(resolved(token));
    } catch (error) {
      console.log(error);
      dispatch(rejected(error.message));
    }
  };
}

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
  },
});

// Extraire les actions
const { fetching, resolved, rejected } = actions;
export const { deconnect } = actions;

export default reducer;
