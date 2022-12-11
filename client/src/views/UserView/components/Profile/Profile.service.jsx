import axios from 'axios';
const API_URL = 'http://localhost:3001/api/v1/users';

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
        console.log('xdxdx');
        console.log(username);
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
