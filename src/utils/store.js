import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/token';
import profileReducer from '../features/profile';

export default configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
});
