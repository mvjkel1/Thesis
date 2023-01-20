import { Alert, Box, Button, Snackbar } from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearNotification } from '../../../redux/actions/messages';

export function StatusSnackbar() {
  const workgroups = useSelector((state) => state.workgroups);
  const classes = useSelector((state) => state.classes);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (workgroups.error || classes.error) {
      setOpen(true);
      setAlertMessage(workgroups.error || classes.error);
    }
  }, [workgroups.error, classes.error]);
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity="error">{alertMessage}</Alert>
    </Snackbar>
  );
}

export function MessageSnackbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conversationsSelector = (state) => state.messages.conversations;
  const notificationsSelector = createSelector(conversationsSelector, (conversations) => {
    return Array.isArray(conversations) ? conversations.map((conv) => conv.notification) : [];
  });
  const notifications = useSelector(notificationsSelector);
  const handleClose = (notification) => {
    dispatch(clearNotification(notification));
  };

  return (
    <Box>
      {Array.isArray(notifications)
        ? notifications.map((notification) => (
            <Snackbar
              key={notification?.text || Math.random()}
              open={notification?.text}
              onClose={() => handleClose(notification)}
              autoHideDuration={60000}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert
                severity="info"
                action={
                  <Button
                    size="small"
                    onClick={() => navigate(`/chat/${notification.conversationId}`)}
                  >
                    OPEN
                  </Button>
                }
              >
                You've got an new unread message.
              </Alert>
            </Snackbar>
          ))
        : ''}
    </Box>
  );
}
