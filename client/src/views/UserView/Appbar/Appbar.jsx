import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { switchDrawer, switchMode } from '../../../redux/actions/theme';
import { MaterialUISwitch } from '../Sidebar/sidebar.styles';
import { StyledAppBar } from './Appbar.styles';

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
    <>
      <StyledAppBar elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <Box>
                <IconButton
                  size="large"
                  aria-label="open"
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
                  color="text.primary"
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    fontWeight: 700,
                    letterSpacing: '.1rem',
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
      </StyledAppBar>
      <Toolbar />
    </>
  );
};
export default ResponsiveAppBar;
