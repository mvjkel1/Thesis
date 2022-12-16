import axios from 'axios';
import { useSelector } from 'react-redux';

const API_URL = 'http://localhost:3001/api/v1/groups';

export const joinGroup = (invitationToken, token) => {
  return axios
    .post(`${API_URL}/${invitationToken}`, {}, { headers: { Authorization: `Bearer ${token}` } })
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
