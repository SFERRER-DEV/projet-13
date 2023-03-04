// 1️⃣ Login
export const loginSelector = (state) => state.login;

// 2️⃣ Profile
export const userIdSelector = (state) => state.profile.id;

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

export const userFailedSelector = (state) => {
  return {
    status: state.profile.status,
    message: state.profile.message,
    error: state.profile.error,
  };
};

// 3️⃣ Login + Profile 👮‍♂️
export const connectedSelector = (state) => {
  if ((state.login.token !== null) & (state.profile.id !== null)) {
    return true;
  } else {
    return false;
  }
};

export const userSuccessSelector = (state) => {
  return {
    status:
      (state.login === 'void') & (state.profile.status === 'resolved')
        ? 'success'
        : 'void',
    email: state.profile.email,
    createdAt: state.progile.createdAt,
    message: state.profile.message,
    error: state.profile.error,
  };
};
