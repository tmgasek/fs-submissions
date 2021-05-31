const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.message;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message,
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      });
    }, timeout);
  };
};

export default notificationReducer;
