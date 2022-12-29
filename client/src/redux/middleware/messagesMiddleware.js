
import { io } from "socket.io-client";
import { getUserConversations, setMessageNotification, updateActiveUsers } from "../actions/messages";

const messagesMiddleware = store => {
    let socket;
   
    return next => action => {
      const user = store.getState().auth.user;
   
      if (action.type == "MESSAGES_SOCKET_INIT") {
        // Init socket connection
        socket = io("ws://localhost:8800");

        // Notify other users that you're in.
        socket.emit("new-user-add", user._id);

        // Get other on-line users.
        socket.on("get-users", (users) => {
          store.dispatch(updateActiveUsers(users));
        });

        // Get all conversations (without messages).
        store.dispatch(getUserConversations(user._id, user.token))

        // If receives notification, add message to conversations array.
        socket.on("receive-message", (data) => {
          store.dispatch(setMessageNotification(data)); //change name to RECEIVE_MESSAGE
        }
        );
      }
   
      // If user submits message, emit event and dispatch action that adds message by post.
      if (action.type == "SEND_MESSAGE_SUCCESS") {
        socket.emit("send-message", action.payload);
      }

      if (action.type == "LOGOUT") {
        socket.disconnect();
        console.log("disconnected");
      }

   
      next(action);
    }
  }
   
  export default messagesMiddleware;