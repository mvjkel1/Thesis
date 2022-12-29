import { useToken } from '../../commons/useToken';
import { MessageService } from '../services/messages.service';
import store from '../store';

const mapConversations = (conversations) => conversations.map((conv) => ({...conv, messages: []}))

export const getUserConversations = (groupId, token) => (dispatch) => {
  return MessageService.getConversations(groupId, token).then(
    (data) => {
      dispatch({
        type: 'GET_CONVERSATIONS_SUCCESS',
        payload: mapConversations(data.conversation)
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: 'GET_CONVERSATIONS_FAIL',
        payload: message
      });
      return Promise.reject();
    }
  );
};

export const createConversation = (data, token) => (dispatch) => {
    return MessageService.createConversation(data, token).then(
      (data) => {
        dispatch({
          type: 'CREATE_CONVERSATION_SUCCESS',
          payload: mapConversations([data.conversation])
        });
        return Promise.resolve(data.conversation);
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: 'CREATE_CONVERSATION_FAIL',
          payload: message
        });
        return Promise.reject();
      }
    );
  };

  export const sendMessage = (message, token) => (dispatch) => {
    return MessageService.sendMessage(message, token).then(
      (data) => {
        console.log("MESSAGSGDGAF");
        console.log(data.message);
        dispatch({
          type: 'SEND_MESSAGE_SUCCESS',
          payload: data.message
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: 'SEND_MESSAGE_FAIL',
          payload: message
        });
        return Promise.reject();
      }
    );
  };

  export const getConversationMessages = (conversationId, token) => (dispatch) => {
    return MessageService.getMessages(conversationId, token).then(
      (data) => {
        dispatch({
          type: 'GET_MESSAGES_SUCCESS',
          payload: data.messages
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: 'GET_MESSAGES_FAIL',
          payload: message
        });
        return Promise.reject();
      }
    );
  };

export const messagesSocketInit = (payload) => {
return {
    type: 'MESSAGES_SOCKET_INIT'
};
};

export const clearNotification = (payload) => {
    return {
        type: 'CLEAR_MESSAGE_NOTIFICATION',
        payload
    };
    };

export const updateActiveUsers = (payload) => {
    return {
      type: 'UPDATE_ACTIVE_USERS',
      payload
    };
  };

  export const setMessageNotification = (payload) => {
    return {
      type: 'MESSAGE_NOTIFICATION',
      payload
    };
  };