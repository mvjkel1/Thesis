import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REQUEST_PASS_RECOVERY_SUCCESS,
  REQUEST_PASS_RECOVERY_FAILED,
  LOGOUT
} from '../actions/types';

const initialState = {
  isLoading: false,
  loaded: false,
  data: null,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_EVENTS_REQUEST':
      return {
        ...state,
        isLoading: true,
        loaded: false,
        data: null,
        error: null
      };
    case 'GET_EVENTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: payload,
        error: null
      };
    case 'GET_EVENTS_FAIL':
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: null,
        error: payload
      };
    default:
      return state;
  }
}
