import { Avatar, Box, IconButton, Typography} from '@mui/material';
import {
  SettingsIconButton,
  UserSettingsIcon,
} from './UserToolbar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useState } from 'react';
import {useTranslation} from 'react-i18next';

export default function UserToolbar() {
    const user = useSelector((state) => state.auth.user);
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
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Account settings">
            <SettingsIconButton onClick={handleClick}>
              <Avatar sx={{ bgcolor: 'transparent', width: 24, height: 24 }}>
                <UserSettingsIcon />
              </Avatar>
            </SettingsIconButton>
          </Tooltip>
          <IconButton>
              <Avatar
                sx={{ width: 54, height: 54 }}
                alt={user.name}
                src="/assets/avatar.png"
              />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography noWrap color="text.primary" fontWeight={700}>
              {user.name}
            </Typography>
            <Typography noWrap color="text.secondary">
              {user.email}
            </Typography>
          </Box>
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