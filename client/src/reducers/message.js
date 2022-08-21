import {
  SET_LOGIN_MESSAGE,
  SET_REGISTER_MESSAGE,
  CLEAR_MESSAGE,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_REGISTER_MESSAGE:
      return { register_message: payload };
    case SET_LOGIN_MESSAGE:
      return { login_message: payload };
    case CLEAR_MESSAGE:
      return { login_message: "", register_message: "" };
    default:
      return state;
  }
}
