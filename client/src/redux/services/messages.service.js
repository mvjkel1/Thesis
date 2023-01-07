import axios from 'axios';
import configData from '../../config.json';
const API = axios.create({ baseURL: `${configData.SERVER_URL}api/v1` });

export const getConversations = (userId, token) => {
  let responseData = {};
  return API.get(`/conversations/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      if (response.data) {
        responseData = response.data;
      }
      return responseData;
    });
};

export const getMessages = (conversationId, token) => {
    return API
      .get(
        `/messages/${conversationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(
        (response) => {
          return Promise.resolve(response.data);
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

export const createConversation = (data, token) => {
    return API.post('/conversations', data, { headers: { Authorization: `Bearer ${token}` } })
      .then(
        (response) => {
          console.log(response.data)
          return Promise.resolve(response.data);
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

  export const sendMessage = (message, token) => {
    return API
      .post(
        `/messages`,
        message,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(
        (response) => {
          return Promise.resolve(response.data);
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


export const MessageService = {
  getConversations,
  getMessages,
  createConversation,
  sendMessage
};
