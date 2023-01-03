import axios from 'axios';
import configData from '../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/groups`;
export const getClasses = (groupId, token) => {
  let responseData = {};
  return axios
    .get(`${API_URL}/${groupId}/classes`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      if (response.data.data) {
        responseData = response.data.data;
      }
      return responseData;
    });
};

export const DataService = {
  getClasses
};
