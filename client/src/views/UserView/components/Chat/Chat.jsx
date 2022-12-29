import React, { useRef, useState } from "react";
import ChatBox from '../components/ChatBox/ChatBox'
import Conversation from '../components/Coversation/Conversation';
import NavIcons from "../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getUserConversations, setMessageNotification, updateActiveUsers } from "../../../../redux/actions/messages";
import { useParams } from "react-router-dom";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const {conversationId} = useParams();
  const user = useSelector((state) => state.auth?.user);

  const conversation = useSelector(state => state.messages?.conversations)?.find(conv => conv._id == conversationId)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(conversationId);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  /*
  // Get the chat in chat section
  useEffect(() => {
      dispatch(getUserConversations(user._id, user.token))
  }, [user?._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      dispatch(updateActiveUsers(users));
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      console.log("emitting:");
      console.log(sendMessage);
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("received message:")
      console.log(data)
      setReceivedMessage(data);
      setMessageNotification(data);
    }
    );
  }, []);

  */

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={conversation} //ok
          currentUser={user._id} //ok
          setSendMessage={setSendMessage} //ok
          receivedMessage={receivedMessage} //ok
        />
      </div>
    </div>
  );
};

export default Chat;
