import loginService from '../services/login';
import storage from '../utils/storage';
import { setNotification } from './notificationReducer';

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
    try {
      const user = await loginService.login({
        username,
        password,
      });
      storage.saveUser(user);
      dispatch({
        type: 'LOGIN',
        data: user,
      });
      dispatch(
        setNotification(
          'success',
          `${user.username} logged in successfully`,
          3000
        )
      );
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification('error', 'wrong username / password', 3000));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    storage.logoutUser();
    dispatch({
      type: 'LOGOUT',
    });
    dispatch(setNotification('success', 'logged out successfully', 3000));
  };
};
export default userReducer;
