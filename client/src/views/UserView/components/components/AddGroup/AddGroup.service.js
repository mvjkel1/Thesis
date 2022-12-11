import axios from 'axios';
const API_URL = 'http://localhost:3001/api/v1/groups';

export const addGroup = (name, token) => {
  return axios
    .post(
      API_URL,
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
