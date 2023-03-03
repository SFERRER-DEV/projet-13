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

// 3️⃣ Login + Profile 👮‍♂️
export const connectedSelector = (state) => {
  if ((state.login.token !== null) & (state.profile.id !== null)) {
    return true;
  } else {
    return false;
  }
};
