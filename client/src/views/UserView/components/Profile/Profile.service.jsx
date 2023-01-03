import axios from 'axios';
import configData from '../../../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/users`;

export const changePassword = (oldPassword, newPassword, newPasswordConfirm, token) => {
  return axios
    .patch(
      `${API_URL}/update-password`,
      {
        passwordCurrent: oldPassword,
        password: newPassword,
        passwordConfirm: newPasswordConfirm
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

export const changeDetails = (username, email, token) => {
  return axios
    .patch(
      `${API_URL}/update-me`,
      {
        name: username,
        email: email
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
