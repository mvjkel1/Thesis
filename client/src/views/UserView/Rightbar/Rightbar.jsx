import { Avatar, AvatarGroup, Box, Typography, IconButton, Button } from '@mui/material';
import { Stack } from '@mui/system';
import {
  CurrentUserContainer,
  RecentlyActiveContainer,
  SettingsIconButton,
  TitleWrapper,
  UserEntryContainer,
  UserSettingsIcon
} from './Rightbar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/auth';
import { switchMode } from '../../../redux/actions/theme';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

const users = ['Bogus', 'Michal', 'Kasia', 'Basia', 'Asia', 'Stasia'];

export const UserEntry = ({ username }) => {
  return (
    <UserEntryContainer>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography color="text.primary" ml={1}>
          {username}
        </Typography>
      </Box>
    </UserEntryContainer>
  );
};

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    <React.Fragment>
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
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export const Rightbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                src="https://thispersondoesnotexist.com/image"
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
      <Box>
        <TitleWrapper color="text.primary">Activity</TitleWrapper>
        <RecentlyActiveContainer>
          {users.map((user) => (
            <UserEntry key={user} username={user} />
          ))}
        </RecentlyActiveContainer>
      </Box>
    </Stack>
  );
};
