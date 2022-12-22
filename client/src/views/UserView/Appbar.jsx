import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/actions/auth';
import { useNavigate } from 'react-router-dom';
import { switchDrawer, switchMode } from '../../redux/actions/theme';
import { MaterialUISwitch } from './Sidebar/sidebar.styles';

const pages = ['test', 'test2', 'test3'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = () => {
    dispatch(switchDrawer(true));
  };

  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: 'light-blue' }} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100vw'
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: 'black',
                    textDecoration: 'none'
                  }}
                >
                  StudentShare
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px'
                }}
              >
                <MaterialUISwitch
                  onClick={() =>
                    dispatch(mode == 'dark' ? switchMode('light') : switchMode('dark'))
                  }
                />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};
export default ResponsiveAppBar;
