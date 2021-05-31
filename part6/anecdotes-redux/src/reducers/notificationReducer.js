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

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    message,
  };
};

export const notificationClear = () => {
  return {
    type: 'CLEAR',
  };
};

export default notificationReducer;
