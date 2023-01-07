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
import { GroupMembers } from '../components/components/GroupMembers/GroupMembers';
import {useTranslation} from 'react-i18next';
import { DisplaySettings } from '../components/components/DisplaySettings/DisplaySettings';

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

export default function AccountMenu() {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <SettingsIconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: 'transparent', width: 24, height: 24 }}>
              <UserSettingsIcon />
            </Avatar>
          </SettingsIconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <Avatar /> {t('Rightbar.myaccount')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export const Rightbar = () => {
  const user = useSelector((state) => state.auth.user);
  const {t} = useTranslation();

  return (
    <Stack mt={2} sx={{ width: '23%', position: 'fixed', paddingLeft: 1.25 }}>
      <Box>
        <CurrentUserContainer sx={{ gap: 1 }}>
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
            <AccountMenu />
            <IconButton>
              <Avatar
                sx={{ width: 54, height: 54 }}
                alt={user.name}
                src="/assets/avatar.png"
              />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography noWrap color="text.primary" fontWeight={700}>
              {user.name}
            </Typography>
            <Typography noWrap color="text.secondary">
              {user.email}
            </Typography>
          </Box>
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
