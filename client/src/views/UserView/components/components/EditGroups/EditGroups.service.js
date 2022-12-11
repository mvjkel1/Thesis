import axios from 'axios';
const API_URL = 'http://localhost:3001/api/v1/groups';

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
