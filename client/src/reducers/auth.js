import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  currentUser: null || JSON.parse(localStorage.getItem("user")),
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
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
        currentUser: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: payload,
        currentUser: null,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
}
