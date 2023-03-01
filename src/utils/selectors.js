// export const tokenSelector = (state) => state.login.token;
export const tokenSelector = (state) => state.login;

export const userIdSelector = (state) => state.profile.id;

export const connectedSelector = (state) => {
  if (state.login.token !== null && state.profile.id !== null) {
    return true;
  } else {
    return false;
  }
};

export const userProfileSelector = (state) => {
  return {
    email: state.profile.email,
    id: state.profile.id,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    createdAt: state.profile.createdAt,
    updatedAt: state.profile.updatedAt,
  };
};
