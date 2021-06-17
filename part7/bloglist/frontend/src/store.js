import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import blogReducer from './reducers/blogReducer';
import currUserReducer from './reducers/currUser';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  currUser: currUserReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
