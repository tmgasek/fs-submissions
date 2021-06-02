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

let timeoutId;
export const setNotification = (message, timeout) => {
  return (dispatch) => {
    clearTimeout(timeoutId);

    dispatch({
      type: 'NOTIFY',
      message,
    });

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      });
    }, timeout);
  };
};

export default notificationReducer;
