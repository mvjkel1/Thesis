import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import logger from "redux-logger";

const middleware = [thunk];

const reducer = {
  auth
};

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
