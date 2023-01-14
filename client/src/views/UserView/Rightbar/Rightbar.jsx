import { Avatar, AvatarGroup, Box, Typography, IconButton, Button } from '@mui/material';
import { Stack } from '@mui/system';
import {
  CurrentUserContainer,
  RecentlyActiveContainer,
  SettingsIconButton,
  TitleWrapper,
  UserEntryContainer,
  UserSettingsIcon,
  StyledBadge
} from './Rightbar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { createConversation, messagesSocketInit } from '../../../redux/actions/messages';
import { GroupMembers } from '../../../components/subcomponents/GroupMembers/GroupMembers';
import {useTranslation} from 'react-i18next';
import { DisplaySettings } from '../../../components/subcomponents/DisplaySettings/DisplaySettings';
import UserToolbar from '../../../components/subcomponents/UserToolbar/UserToolbar';

export const UserEntry = ({ user, onChatStart }) => {
  const activeUsers = useSelector(state => state.messages.activeUsers);
  const currentUser = useSelector(state => state.auth.user);
  const isOnline = () => {
    return activeUsers.some(usr => usr.userId == user._id) && user._id !== currentUser._id
  }
  return (
    <UserEntryContainer>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant={isOnline() ? "dot" : ""}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <Typography color="text.primary" ml={1}>
          {user.name}
        </Typography>
        <Button onClick={() => onChatStart(user)}>chat</Button>
      </Box>
    </UserEntryContainer>
  );
};

export const Rightbar = () => {
  const {t} = useTranslation();

  return (
    <Stack mt={2} sx={{ width: '23%', position: 'fixed', paddingLeft: 1.25 }}>
      <Box>
        <CurrentUserContainer>
            <UserToolbar/>
        </CurrentUserContainer>
      </Box>
      <Box mt={2} mb={2}>
        <Typography fontWeight={500} fontSize={18} color="text.primary">{t('Rightbar.users')}</Typography>
      </Box>
      <GroupMembers/>
      <Box mt={2} mb={2}>
        <Typography fontWeight={500} fontSize={18} color="text.primary">{t('Rightbar.displaysettings')}</Typography>
      </Box>
      <DisplaySettings/>
    </Stack>
  );
};
