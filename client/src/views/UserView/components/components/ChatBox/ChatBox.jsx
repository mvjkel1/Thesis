import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConversationMessages, sendMessage } from "../../../../../redux/actions/messages";
import { ChatBoxContainer, ChatsContainer, HeaderContainer, Message, SendButton, SenderContainer } from "./ChatBox.styles";
import { Avatar, Typography } from "@mui/material";

const ChatBox = ({...props}) => {
  const dispatch = useDispatch();
  const {conversationId} = useParams();
  const user = useSelector(state => state.auth.user)
  const conversation = useSelector(state => state.messages?.conversations.find(conv => conv._id == conversationId))
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

  useEffect(() => {
      if(conversation && conversation?.messages?.length < 1)
        dispatch(getConversationMessages(conversationId, user.token)) 
  }, [conversationId, conversation, user])

  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[conversation?.messages])

  const handleSend = async(e)=> {
    e.preventDefault()
    const receiverId = conversation.members.find((id)=>id!==user._id);
    const message = {
      senderId : user._id,
      text: newMessage,
      conversationId,
      receiverId: receiverId
  }

  dispatch(sendMessage(message, user.token))
  .then(() => setNewMessage(""))
}
  return (
    <>
      <ChatBoxContainer key={conversationId}>
        {conversation ? (
          <>
            <HeaderContainer>
              <Avatar>A</Avatar>
            </HeaderContainer>
            <ChatsContainer>
              {conversation?.messages?.map((message) => (
                <>
                  <Message 
                    ref={scroll}
                    own={message.senderId === user._id}
                  >
                    <Typography>{message.text}</Typography>{" "}
                    <Typography>{format(message.createdAt)}</Typography>
                  </Message>
                </>
              ))}
            </ChatsContainer>
            <SenderContainer>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <SendButton variant="contained" onClick = {handleSend}>Send</SendButton>
            </SenderContainer>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </ChatBoxContainer>
    </>
  );
};

export default ChatBox;
