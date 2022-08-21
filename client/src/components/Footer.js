import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Link } from "react-router-dom";

const ResponsiveAppBar = (props) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: 5,
        marginBottom: 2,
        backgroundColor: "#2F2F2F",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: "500",
              fontSize: 13,
            }}
          >
            2022, task#4 for intern developer training by Bogumił Kania
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
