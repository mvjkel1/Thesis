import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import workgroups from "./reducers/workgroups";
import classes from "./reducers/classes";
import theme from "./reducers/theme";
import logger from "redux-logger";

const middleware = [thunk];

const reducer = {
  auth,
  workgroups,
  classes,
  theme,
};

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
