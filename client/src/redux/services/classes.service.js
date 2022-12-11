import axios from 'axios';
import { useToken } from '../../commons/useToken';
const API_URL = 'http://localhost:3001/api/v1/groups';
export const getClasses = (groupId, token) => {
  let responseData = {};
  return axios
    .get(`${API_URL}/${groupId}/classes`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      if (response.data.data) {
        responseData = response.data.data.data;
      }
      return responseData;
    });
};

export const DataService = {
  getClasses
};
