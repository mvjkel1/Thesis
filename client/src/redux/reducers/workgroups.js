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
  currentWorkgroup: null,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'GET_WORKGROUPS_REQUEST':
      return {
        ...state,
        isLoading: true,
        loaded: false,
        data: null,
        currentWorkgroup: null,
        error: null
      };
    case 'GET_WORKGROUPS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: payload,
        currentWorkgroup: payload[0] || null,
        error: null
      };
    case 'GET_WORKGROUPS_FAIL':
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: null,
        currentWorkgroup: null,
        error: payload
      };
    case 'SWITCH_WORKGROUP':
      return {
        ...state,
        currentWorkgroup: payload
      };
    default:
      return state;
  }
}
