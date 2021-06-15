import loginService from '../services/login';
import storage from '../utils/storage';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.data;
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const loadUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser();
    dispatch({
      type: 'LOAD',
      data: user,
    });
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
    storage.saveUser(user);
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    storage.logoutUser();
    dispatch({
      type: 'LOGOUT',
    });
  };
};
export default userReducer;
