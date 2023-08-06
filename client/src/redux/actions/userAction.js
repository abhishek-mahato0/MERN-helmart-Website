import { LOGIN_SUCCESS, LOG_OUT } from '../constants/userConstants';

export const loginuserinfo = (data) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data,
  });
  localStorage.setItem('userInfo', JSON.stringify(data));
};
export const logout = (data) => (disptch) => {
  disptch({
    type: LOG_OUT,
    payload: data,
  });
};
