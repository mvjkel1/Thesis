import axios from 'axios';
import configData from '../../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/groups`;

export const deleteEvent = (groupId, eventId, token) => {
  return axios
    .delete(`${API_URL}/${groupId}/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(
      (response) => {
        return Promise.resolve(response.data.data);
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
};
