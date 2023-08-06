import { LOGIN_SUCCESS, LOG_OUT } from '../constants/userConstants';

export const loginreducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
