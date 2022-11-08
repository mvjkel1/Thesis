import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REQUEST_PASS_RECOVERY_SUCCESS,
  REQUEST_PASS_RECOVERY_FAILED,
  SET_REGISTER_MESSAGE,
  SET_LOGIN_MESSAGE,
} from "./types";

import { AuthService } from "../services/auth.service";

export const registerAction =
  (name, email, password, passwordConfirm) => (dispatch) => {
    return AuthService.register(name, email, password, passwordConfirm).then(
      (data) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log("ERROR:::" + error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const requestPasswordRecovery = (email) => (dispatch) => {
  return AuthService.requestPasswordRecovery(email).then(
    (data) => {
      dispatch({
        type: REQUEST_PASS_RECOVERY_SUCCESS,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log("ERROR:::" + error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: REQUEST_PASS_RECOVERY_FAILED,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
