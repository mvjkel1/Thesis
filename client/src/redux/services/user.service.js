import axios from 'axios';
import { authHeader } from './auth-header';
import configData from '../../config.json';
const API_URL = `${configData.SERVER_URL}api/test/`;

const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};
const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_URL + 'mod', { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() });
};
export const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard
};
