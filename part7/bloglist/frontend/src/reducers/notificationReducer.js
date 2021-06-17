const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        className: action.className,
        message: action.message,
      };
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

let timeoutId;
export const setNotification = (className, message, timeout) => {
  return (dispatch) => {
    clearTimeout(timeoutId);

    dispatch({
      type: 'NOTIFY',
      className,
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
