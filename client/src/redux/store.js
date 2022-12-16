import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import auth from './reducers/auth';
import workgroups from './reducers/workgroups';
import classes from './reducers/classes';
import events from './reducers/events';
import theme from './reducers/theme';
import logger from 'redux-logger';

const middleware = [thunk];

const reducer = {
  auth,
  workgroups,
  classes,
  events,
  theme
};

const combinedReducer = combineReducers({
  auth,
  workgroups,
  classes,
  events,
  theme
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    // check for action type
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
