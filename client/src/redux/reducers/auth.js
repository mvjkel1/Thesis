import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
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
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
