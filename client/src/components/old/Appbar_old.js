import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginPrompt } from "../actions/prompt";
import { logout } from "../actions/auth";

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch(logout());
    setAnchorElNav(null);
    navigate("/");
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: 5,
        marginTop: 1,
        backgroundColor: "#2F2F2F",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { md: "flex" }, fontWeight: "750" }}
          >
            Task 4 example >{" "}
            {window.location.pathname
              .substring(1)
              .substring(0, window.location.pathname.substring(1).indexOf("/"))
              ? window.location.pathname
                  .substring(1)
                  .substring(
                    0,
                    window.location.pathname.substring(1).indexOf("/")
                  )
              : "main"}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Box>
            <Typography>
              {currentUser
                ? "Logged as: " + currentUser.username
                : "Not logged in."}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0.05 }}>
            <Button
              onClick={() => {
                dispatch(toggleLoginPrompt(true));
              }}
              sx={{ display: currentUser ? "none" : "inline" }}
              hidden
            >
              {" "}
              Log In.{" "}
            </Button>
          </Box>

          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                disabled={!currentUser}
                key="logout"
                onClick={handleLogout}
              >
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
