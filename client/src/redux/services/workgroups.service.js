import axios from 'axios';
import { useToken } from '../../commons/useToken';
const API_URL = 'http://localhost:3001/api/v1/groups/my-group';
export const getWorkgroups = (token) => {
  let responseData = {};
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
    if (response.data.group) {
      responseData = response.data.group;
    }
    return responseData;
  });
};

export const DataService = {
  getWorkgroups
};
