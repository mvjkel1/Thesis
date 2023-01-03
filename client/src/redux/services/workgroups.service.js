import axios from 'axios';
import { useToken } from '../../commons/useToken';
import configData from '../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/groups`;

export const getWorkgroups = (token) => {
  let responseData = {};
  return axios
    .get(`${API_URL}/my-group`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      if (response.data.group) {
        responseData = response.data.group;
      }
      return responseData;
    });
};

export const joinGroup = (invitationToken, token) => {
  console.log('join group called with:');
  console.log(`Bearer ${token}`);
  console.log(`${API_URL}/${invitationToken}`);
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

export const DataService = {
  getWorkgroups,
  joinGroup
};
