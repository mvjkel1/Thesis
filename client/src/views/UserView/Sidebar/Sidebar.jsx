import {
  Box,
  Collapse,
  Divider,
  FormControl,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
  LinearProgress,
  IconButton
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { useState } from 'react';
import { getWorkgroups, switchWorkgroup } from '../../../redux/actions/workgroups';
import { useNavigate } from 'react-router-dom';
import { usePageStatus } from './pages';
import { PAGES, PAGES_SECONDARY } from './pages';
import { useTranslation } from 'react-i18next';
import {
  LogoWrapper,
  NewBadge,
  NewBadgeText,
  SideBarItem,
  SidebarSectionText,
  SideBarSubItem,
  GroupSelect
} from './sidebar.styles';
import { useDispatch, useSelector } from 'react-redux';
import { switchDrawer } from '../../../redux/actions/theme';
import UserToolbar from '../../../components/subcomponents/UserToolbar/UserToolbar';

const CollapsingList = ({ name, subpages, workgroup, isAdmin }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <SideBarItem onClick={handleOpen}>
        <ListItemIcon>
          <SchoolIcon color="icon" />
        </ListItemIcon>
        <ListItemText>
          <Typography color="text.primary">{name}</Typography>{' '}
        </ListItemText>
        {open ? <ExpandLess color="icon" /> : <ExpandMore color="icon" />}
      </SideBarItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300
          }}
        >
          {isAdmin && (
            <SideBarSubItem onClick={() => navigate(`/group-admin/${workgroup._id}`)}>
              <ListItemIcon>
                <AddIcon color="icon" />
              </ListItemIcon>
              <ListItemText primary={<Typography color="text.primary">Add class</Typography>} />
            </SideBarSubItem>
          )}
          {subpages?.map((subpage) => (
            <SideBarSubItem
              key={subpage._id}
              onClick={() => navigate(`/class/${subpage._id}`)}
              button
            >
              <ListItemIcon>
                <LibraryBooksIcon color="icon" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography color="text.primary">{subpage.name}</Typography>}
              />
            </SideBarSubItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const PageItem = ({ page, subpages }) => {
  const navigate = useNavigate();
  const { label, route, icon, options } = usePageStatus(page);
  const isActive = useMatch(route);
  const {t} = useTranslation();
  return (
    <SideBarItem key={route} selected={Boolean(isActive)} onClick={() => navigate(route)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Typography color="text.primary">{t(`Sidebar.${label}`)}</Typography>
      </ListItemText>
      {options?.new && (
        <NewBadge>
          <NewBadgeText>New</NewBadgeText>
        </NewBadge>
      )}
    </SideBarItem>
  );
};

const GroupPicker = ({ workgroups, currentWorkgroup, handleWorkgroupChange }) => {
  return (
    <FormControl fullWidth>
      <GroupSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentWorkgroup?._id || ''}
        onChange={(event) => handleWorkgroupChange(event.target.value)}
      >
        {workgroups?.map?.((workgroup) => (
          <MenuItem key={workgroup._id} value={workgroup._id}>
            {workgroup.name}
          </MenuItem>
        ))}
      </GroupSelect>
    </FormControl>
  );
};

export const Sidebar = () => {
  const workgroups = useSelector((state) => state.workgroups.data);
  const classes = useSelector((state) => state.classes.data);
  const currentWorkgroup = useSelector((state) => state.workgroups.currentWorkgroup);
  const drawer = useSelector((state) => state.theme.drawer);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const {t} = useTranslation();
  
  const handleWorkgroupChange = (workgroupId) => {
    dispatch(switchWorkgroup(workgroupId));
  };

  const handleOpenNavMenu = () => {
    dispatch(switchDrawer(!drawer));
  };

  useEffect(() => {
    dispatch(getWorkgroups(user.token));
  }, [user]);

  return (
    <Box
      className="sidebarContent"
      sx={{ position: 'fixed', width: '100%', maxWidth: '20vw', zIndex: '10' }}
    >
      <Box sx={{overflowY: "scroll", maxHeight: "100vh"}}>
        <LogoWrapper>
          <Box sx={{flex:1}} display={{md: "none", xl: "none"}}/>
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              color="text.primary"
              sx={{
                mr: 2,
                fontWeight: 900,
                letterSpacing: '.1rem',
                textDecoration: 'none'
              }}
            >
              StudentShare
            </Typography>
          </Box>
          <Box display={{xs: "flex", sm: "flex", md: "none", xl: "none",}} sx={{flex: 1, justifyContent: "flex-end"}}>
            <IconButton
              size="large"
              aria-label="open sidebar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            </Box>
        </LogoWrapper>
        <Box>
          <SidebarSectionText>{t('Sidebar.menu')}</SidebarSectionText>
        </Box>
        <Box>
          <List>
            {PAGES.map((page) => (
              <PageItem key={page} page={page}></PageItem>
            ))}
            <CollapsingList
              name={t('Sidebar.myclasses')}
              subpages={classes}
              isAdmin={currentWorkgroup?.founder?._id == user?._id}
              workgroup={currentWorkgroup}
            />
          </List>
        </Box>
        <Box mr={3} ml={3} mb={2}>
          <Divider />
        </Box>
        <Box>
          <SidebarSectionText>{t('Sidebar.currentworkgroup')}</SidebarSectionText>
        </Box>
        <Box ml={2} mr={2} mt={1}>
          <GroupPicker
            workgroups={workgroups}
            currentWorkgroup={currentWorkgroup}
            handleWorkgroupChange={handleWorkgroupChange}
          />
        </Box>
        <Box>
          {PAGES_SECONDARY.map((page) => (
            <PageItem page={page} />
          ))}
        </Box>
        <Box mr={3} ml={3}>
          <Divider />
        </Box>
        <Box mt={2} mb={1}>
          <SidebarSectionText>{t('Sidebar.storage')}</SidebarSectionText>
        </Box>
        <Box ml={2.6} mr={2}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Typography color="text.primary" sx={{ fontWeight: 600 }}>100.12 MB</Typography>
            <Typography color="text.primary">{t('Sidebar.used')}</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14 }} mb={1} color="text.secondary">
              10% {t('Sidebar.used')} - 1.00 GB {t('Sidebar.free')}
            </Typography>
          </Box>
          <LinearProgress sx={{ height: '10px', borderRadius: 2 }} variant="determinate" value={10} />
        </Box>
        <Box mr={3} ml={3} mt={3} mb={2} display={{xs: "block", sm: "block", md: "none", xl: "none"}}>
          <Divider />
        </Box>
        <Box ml={2.6} mr={2} mt={1} display={{xs: "flex", sm: "flex", md: "none", xl: "none"}}>
          <UserToolbar/>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
