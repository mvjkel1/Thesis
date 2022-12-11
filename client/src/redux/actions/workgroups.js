import { useToken } from '../../commons/useToken';
import { DataService } from '../services/workgroups.service';
import { getClasses, getCurrentWorkgroupClasses } from './classes';
import store from '../store';

export const getWorkgroups = (token) => (dispatch) => {
  return DataService.getWorkgroups(token)
    .then(
      (data) => {
        dispatch({
          type: 'GET_WORKGROUPS_SUCCESS',
          payload: data
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: 'GET_WORKGROUPS_FAIL',
          payload: message
        });
        return Promise.reject();
      }
    )
    .then((res) => {
      dispatch(getClasses(store.getState().workgroups.currentWorkgroup._id, token));
      return res;
    });
};

export const switchWorkgroup = (id) => (dispatch, getState) => {
  const selectedGroup = getState().workgroups.data.find((group) => group._id == id);
  dispatch({
    type: 'SWITCH_WORKGROUP',
    payload: selectedGroup
  });
};
