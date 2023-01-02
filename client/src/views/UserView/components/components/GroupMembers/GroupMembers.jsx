import { Avatar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, register } from "timeago.js";
import { createConversation, messagesSocketInit } from "../../../../../redux/actions/messages";
import {
    RecentlyActiveContainer,
    UserEntryContainer,
    StyledBadge
  } from './GroupMembers.styles';
  import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
  import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { createSelector } from "@reduxjs/toolkit";
import { localeFunc } from "./localefunc";
import { useMemo } from "react";

const UserEntry = ({ user, currentUser, activeUsers, notifications, onChatStart }) => {
    const isOnline = activeUsers.some(usr => usr.userId == user._id) && user._id !== currentUser._id
    const isCurrentUser = currentUser._id == user._id;

    return (
      <UserEntryContainer>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant={isOnline || isCurrentUser ? "dot" : ""}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </StyledBadge>
          <Box sx={{display: "flex", flex: 1}}>
            <Typography color="text.primary" ml={1}>
              {user.name}{isCurrentUser && " (me)"}
            </Typography>
            <Typography color="text.secondary" ml={1}>
              {!isOnline && !isCurrentUser && format(user.lastLogin, 'my-locale')}
            </Typography>
          </Box>
          {notifications.some(notif => notif?.senderId == user._id) && <FiberManualRecordIcon sx={{height: 15, width: 15}} color="error"/>}
          <IconButton disabled={isCurrentUser} onClick={() => onChatStart(user)}><ChatBubbleIcon color={isCurrentUser ? "neutral" : "primary"} /></IconButton>
        </Box>
      </UserEntryContainer>
    );
  };

export const GroupMembers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const conversations = useSelector(state => state.messages.conversations);
    const activeUsers = useSelector(state => state.messages.activeUsers);
    const currentWorkgroup = useSelector(state => state.workgroups.currentWorkgroup);
    const notificationsSelector = createSelector(state => state.messages.conversations, (conversations) => {
        return conversations.map(conv => conv.notification)
      })
    const notifications = useSelector(notificationsSelector)

    const setTimeagoLocale = useMemo(
      () =>
        register('my-locale', localeFunc),
      []
    );

    useEffect(() => {
        if(currentUser._id)
            dispatch(messagesSocketInit());
      }, [currentUser])
    
    const onChatStart = (toUser) => {
    //check if there is an existing conversation between users
    const existingConversation = conversations.find(conv => conv.members.some(member => member == toUser._id));
    if(existingConversation)
        navigate(`/chat/${existingConversation._id}`)
    else
        dispatch(createConversation({receiverId: toUser._id}, currentUser.token))
        .then((resp) => navigate(`/chat/${resp._id}`))
    }

    return (
        <>
            <RecentlyActiveContainer>
                {currentWorkgroup ? currentWorkgroup?.members?.map((user) => (
                    <UserEntry 
                    key={user._id} 
                    user={user} 
                    notifications={notifications}
                    currentUser={currentUser}
                    activeUsers={activeUsers}
                    onChatStart={onChatStart} />
                )) : <UserEntry 
                user={currentUser} 
                notifications={[]}
                currentUser={currentUser}
                activeUsers={activeUsers} />}
            </RecentlyActiveContainer>
        </>
    )
}