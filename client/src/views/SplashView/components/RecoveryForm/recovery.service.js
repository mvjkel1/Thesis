import axios from 'axios';
const API_URL = 'http://localhost:3001/api/v1/users/';
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
