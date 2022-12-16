import { useToken } from '../../commons/useToken';
import { DataService } from '../services/workgroups.service';
import { getClasses, getCurrentWorkgroupClasses } from './classes';
import { getEvents } from './events';
import { logout } from './auth';
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
        if (error.response.status == 401) dispatch(logout());
        return Promise.reject();
      }
    )
    .then((res) => {
      const groupId = store.getState().workgroups.currentWorkgroup._id;
      dispatch(getClasses(groupId, token));
      dispatch(getEvents(groupId, token));
      return res;
    });
};

export const joinGroup = (invitationToken, token) => (dispatch) => {
  return DataService.joinGroup(invitationToken, token).then(
    (data) => {
      dispatch({
        type: 'JOIN_GROUP_SUCCESS',
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
        type: 'JOIN_GROUP_FAIL',
        payload: message
      });
      if (error.response.status == 401) dispatch(logout());
      return Promise.reject();
    }
  );
};

export const switchWorkgroup = (id) => (dispatch, getState) => {
  const selectedGroup = getState().workgroups.data.find((group) => group._id == id);
  dispatch({
    type: 'SWITCH_WORKGROUP',
    payload: selectedGroup
  });
};
