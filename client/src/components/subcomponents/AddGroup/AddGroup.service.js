import axios from 'axios';
import configData from '../../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/groups`;

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
        console.log(response.data);
        return Promise.resolve(response.data);
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
