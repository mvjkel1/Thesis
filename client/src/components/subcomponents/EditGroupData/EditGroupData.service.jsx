import axios from 'axios';
import configData from '../../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/groups`;

export const updateGroupName = (groupId, name, token) => {
  return axios
    .patch(
      `${API_URL}/${groupId}`,
      {
        name: name
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
