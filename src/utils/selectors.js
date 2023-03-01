// 1️⃣ Login
export const loginSelector = (state) => state.login;
export const hasToken = (state) => {
  const regex = /^[\w-]+\.[\w-]+\.[\w-]+$/;
  if (state.login.token !== null && regex.test(state.login.token)) {
    return true;
  } else {
    return false;
  }
};

// 2️⃣ Profile
export const userIdSelector = (state) => state.profile.id;

export const userProfileSelector = (state) => {
  return {
    status: state.profile.status,
    email: state.profile.email,
    id: state.profile.id,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    createdAt: state.profile.createdAt,
    updatedAt: state.profile.updatedAt,
    message: state.profile.message,
    error: state.profile.error,
  };
};

export const userCreatedSelector = (state) => {
  return {
    status: state.profile.status,
    email: state.profile.email,
    createdAt: state.profile.createdAt,
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
