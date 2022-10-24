import axios from "axios";
const API_URL = "http://localhost:3001/api/v1/users/";
export const register = (name, email, password, passwordConfirm) => {
  let responseData = {};
  return axios.post(API_URL + "signup", {
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  })
  .then((response) => {
    if (response.data.token) {
      responseData = {
        ...response.data.data.user,
        token: response.data.token
      }
      localStorage.setItem("user", JSON.stringify(responseData));
    }
    return responseData;
  });
};

const login = (email, password) => {
  console.log(email, password);
  let responseData = {};
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        responseData = {
          ...response.data.data.user,
          token: response.data.token
        }
        localStorage.setItem("user", JSON.stringify(responseData));
      }
      return responseData;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
