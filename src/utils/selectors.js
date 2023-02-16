export const tokenSelector = (state) => state.login.token;

export const userIdSelector = (state) => state.profile.id;

export const connectedSelector = (state) => {
  if (state.login.token !== null && state.profile.id !== null) {
    return true;
  } else {
    return false;
  }
};
