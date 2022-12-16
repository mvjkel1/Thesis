import { useToken } from '../../commons/useToken';
import { DataService } from '../services/events.service';
import store from '../store';
import moment from 'moment';

const mapAppointmentData = (appointment) => ({
  id: appointment._id,
  startDate: moment(appointment.startDate).format(),
  endDate: moment(appointment.endDate).format(),
  title: appointment.title,
  class: appointment.class,
  group: appointment.group,
  createdBy: appointment.createdBy
});

export const getEvents = (groupId, token) => (dispatch) => {
  return DataService.getEvents(groupId, token).then(
    (data) => {
      dispatch({
        type: 'GET_EVENTS_SUCCESS',
        payload: data.map(mapAppointmentData)
      });
      console.log(data.map(mapAppointmentData));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: 'GET_EVENTS_FAIL',
        payload: message
      });
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
