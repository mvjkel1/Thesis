import axios from 'axios';
import { useToken } from '../../commons/useToken';
const API_URL = 'http://localhost:3001/api/v1/groups';
export const getEvents = (groupId, token) => {
  let responseData = {};
  return axios
    .get(`${API_URL}/${groupId}/events`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      if (response.data.data) {
        responseData = response.data.data;
      }
      return responseData;
    });
};

export const DataService = {
  getEvents
};
