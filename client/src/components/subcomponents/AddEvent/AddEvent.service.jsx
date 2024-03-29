import axios from 'axios';
import configData from '../../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/groups`;

export const addEvent = (name, startDate, endDate, description, groupId, classId, token) => {
  return axios
    .post(
      `${API_URL}/${groupId}/events`,
      {
        title: name,
        startDate: startDate,
        endDate: endDate,
        description: description,
        classId: classId
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
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
