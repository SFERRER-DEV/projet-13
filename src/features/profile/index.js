import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  // permet de suivre l'état de la requête
  status: 'void',
  // profile data
  email: null,
  firstName: null,
  lastName: null,
  createdAt: null,
  updatedAt: null,
  id: null,
  // l'erreur lorsque la requête échoue
  error: null,
};

export function fetchOrUpdateProfile(token) {
  return async (dispatch, getState) => {
    // Régler le statut de départ 🏁
    dispatch(fetching());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Obtenir toutes les informations sur un utilisateur 🧐
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        {},
        config
      );
      const data = await response.data.body;
      dispatch(resolved(data));
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
 * @return Reducer
 */
const { actions, reducer } = createSlice({
  name: 'profile',
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
          draft.email = action.payload.email;
          draft.id = action.payload.id;
          draft.firstName = action.payload.firstName;
          draft.lastName = action.payload.lastName;
          draft.createdAt = action.payload.createdAt;
          draft.updatedAt = action.payload.updatedAt;
          draft.status = 'resolved';
          return;
        }
        return;
      },
    },
    // Action rejected 👎
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload;
        draft.status = 'rejected';
        return;
      }
      return;
    },
    // Action forget 👋
    forget: (draft, action) => {
      if (draft.status === 'resolved' && draft.id === action.payload) {
        draft.email = null;
        draft.id = null;
        draft.firstName = null;
        draft.lastName = null;
        draft.createdAt = null;
        draft.updatedAt = null;
        draft.status = 'void';
        return;
      }
      return;
    },
  },
});

// Extraire les actions
const { fetching, resolved, rejected } = actions;
export const { forget } = actions;

export default reducer;
