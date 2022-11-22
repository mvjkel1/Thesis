import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REQUEST_PASS_RECOVERY_SUCCESS,
  REQUEST_PASS_RECOVERY_FAILED,
  LOGOUT,
  UPDATE_USER_DATA,
} from "../actions/types";

const initialState = {
  user: null || JSON.parse(localStorage.getItem("user")),
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        error: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        user: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: payload,
        user: null,
      };
    case REQUEST_PASS_RECOVERY_SUCCESS:
      return {
        ...state,
      };
    case REQUEST_PASS_RECOVERY_FAILED:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        ["user"]: {
          ...state.user,
          name: payload.name,
          email: payload.email,
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
