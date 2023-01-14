import axios from 'axios';
import configData from '../../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/groups`;

export const deleteGroup = (id, token) => {
  return axios
    .delete(`${API_URL}/${id}`, {
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

export const leaveGroup = (id, token) => {
  return axios
    .post(
      `${API_URL}/leave`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
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
