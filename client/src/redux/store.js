import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import auth from './reducers/auth';
import workgroups from './reducers/workgroups';
import classes from './reducers/classes';
import messages from './reducers/messages';
import events from './reducers/events';
import theme from './reducers/theme';
import logger from 'redux-logger';
import messagesMiddleware from './middleware/messagesMiddleware';

const combinedReducer = combineReducers({
  auth,
  workgroups,
  classes,
  events,
  messages,
  theme
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(messagesMiddleware)
});
