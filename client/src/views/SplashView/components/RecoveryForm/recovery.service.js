import axios from 'axios';
import configData from '../../../../config.json';
const API_URL = `${configData.SERVER_URL}api/v1/users/`;

export const requestResetToken = (data) => {
  return axios
    .post(API_URL + 'forgot-password', {
      email: data.email
    })
    .then((response) => {
      if (response.data.status == 'success') {
        return response.data.message;
      } else return Promise.reject(response.data.message);
    })
    .catch((error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject(message);
    });
};

export const resetPassword = (data, token) => {
  return axios
    .patch(API_URL + 'reset-password/' + token, {
      password: data.password,
      passwordConfirm: data.passwordConfirm
    })
    .then((response) => {
      if (response.data.status == 'success') {
        return response.data.message;
      } else return Promise.reject(response.data.message);
    })
    .catch((error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return Promise.reject(message);
    });
};
