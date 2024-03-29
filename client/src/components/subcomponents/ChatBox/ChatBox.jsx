import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { format } from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getConversationMessages, sendMessage } from '../../../redux/actions/messages';
import {
  ChatBoxContainer,
  ChatsContainer,
  HeaderContainer,
  Message,
  SendButton,
  SenderContainer
} from './ChatBox.styles';
import { Typography } from '@mui/material';
const InputEmoji = React.lazy(() => import('react-input-emoji'));

const ChatBox = ({ ...props }) => {
  const dispatch = useDispatch();
  const { conversationId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const currentWorkgroup = useSelector((state) => state.workgroups.currentWorkgroup);
  const conversation = useSelector((state) =>
    state.messages?.conversations.find((conv) => conv._id == conversationId)
  );
  const [newMessage, setNewMessage] = useState('');
  const scroll = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    if (conversation) dispatch(getConversationMessages(conversationId, user.token));
  }, [conversationId, user]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const receiverId = conversation.members.find((id) => id !== user._id);
    const message = {
      senderId: user._id,
      text: newMessage,
      conversationId,
      receiverId: receiverId
    };

    dispatch(sendMessage(message, user.token)).then(() => setNewMessage(''));
  };
  return (
    <>
      <React.Suspense fallback={<div>Just a moment...</div>}>
        <ChatBoxContainer key={conversationId}>
          {conversation ? (
            <>
              <HeaderContainer>
                <Typography fontSize={22} color="text.primary">
                  {
                    currentWorkgroup?.members?.find(
                      (member) => member._id == conversation.members.find((cm) => cm !== user._id)
                    )?.name
                  }
                </Typography>
              </HeaderContainer>
              <ChatsContainer>
                {conversation?.messages?.map((message) => (
                  <>
                    <Message ref={scroll} own={message.senderId === user._id}>
                      <Typography>{message.text}</Typography>{' '}
                      <Typography>{format(message.createdAt)}</Typography>
                    </Message>
                  </>
                ))}
              </ChatsContainer>
              <SenderContainer>
                <InputEmoji value={newMessage} onChange={handleChange} />
                <SendButton variant="contained" onClick={handleSend}>
                  Send
                </SendButton>
              </SenderContainer>{' '}
            </>
          ) : (
            <span className="chatbox-empty-message">Tap on a chat to start conversation...</span>
          )}
        </ChatBoxContainer>
      </React.Suspense>
    </>
  );
};

export default ChatBox;
