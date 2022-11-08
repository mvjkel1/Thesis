import {
  Box,
  Collapse,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  IconButton,
  Avatar,
  Button
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import React from "react";
import { useMatch } from "react-router-dom";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { usePageStatus } from "./pages";
import { PAGES, PAGES_SECONDARY } from "./pages";
import {
  CurrentUserContainer,
  LogoWrapper,
  SideBarItem,
  SidebarSectionText,
  SideBarSubItem,
} from "./sidebar.styles";
import { useSelector } from "react-redux";

const CollapsingList = ({ name, subpages }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <SideBarItem onClick={handleOpen}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </SideBarItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
        }}>
          {subpages.map((subpage) => (
            <SideBarSubItem key={subpage} button>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={subpage} />
            </SideBarSubItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const PageItem = ({ page, subpages }) => {
  const navigate = useNavigate();
  const { label, route, icon } = usePageStatus(page);
  const isActive = useMatch(route);
  return (
    <SideBarItem selected={Boolean(isActive)} onClick={() => navigate(route)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </SideBarItem>
  );
};

const GroupPicker = ({groups}) => {
  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">PUT-TELEINF-2020</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Workgroup"
    onChange={handleChange}
    sx={{
      borderRadius: 4,
    }}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
  )
}

export const Sidebar = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <Box sx={{ position: "fixed", width: "100%", maxWidth: "20vw", zIndex: "10"}}>
      <LogoWrapper>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontWeight: 900,
            letterSpacing: ".1rem",
            color: "black",
            textDecoration: "none",
          }}
        >
          StudentShare
        </Typography>
      </LogoWrapper>
      <Box>
        <SidebarSectionText >
          Main menu
        </SidebarSectionText>
      </Box>
      <Box>
        <List>
          {PAGES.map((page) => (
            <PageItem key={page} page={page}></PageItem>
          ))}
          <CollapsingList
            name="My classes"
            subpages={[
              "test",
              "testfdsfsdf",
              "xdxdxd",
              "sfsdfd",
              "gdgfdgad",
              "fsdfs",
            ]}
          />
        </List>
      </Box>
      <Box mr={3} ml={3}>
        <Divider/>
      </Box>
      <Box mt={2}>
        <SidebarSectionText>
          Current workgroup
        </SidebarSectionText>
      </Box>
      <Box ml={2} mr={2} mt={1}>
        <GroupPicker/>
      </Box>
      <Box>
        {PAGES_SECONDARY.map(page => <PageItem page={page}/> )}
      </Box>
      <Box mr={3} ml={3}>
        <Divider/>
      </Box>
      <Box mt={2}>
        <SidebarSectionText>
          Current user
        </SidebarSectionText>
      </Box>
      <Box ml={2} mr={2}>
        <CurrentUserContainer>
          <IconButton>
            <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
          </IconButton>
          <Button>Settings</Button>
          <Button>Sign-out</Button>
        </CurrentUserContainer>
      </Box>
    </Box>
  );
};

export default Sidebar;
