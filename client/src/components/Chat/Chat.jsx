import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { GroupMembers } from '../subcomponents/GroupMembers/GroupMembers';

export const Chat = () => {
  return (
    <Box mt={2}>
      <Typography fontSize={20} fontWeight={500} ml={0.5} color="text.primary">
        Chat with your group's users
      </Typography>
      <GroupMembers />
    </Box>
  );
};

export default Chat;
