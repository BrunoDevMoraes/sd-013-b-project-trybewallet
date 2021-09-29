const INITIAL_STATE = {
  email: '',
  password: '',
};

const LOG_IN = 'LOG_IN';
const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOG_IN:
    return ({
      ...state,
      email: payload.email,
      password: payload.password,
    });
  default:
    return state;
  }
};

export default user;
