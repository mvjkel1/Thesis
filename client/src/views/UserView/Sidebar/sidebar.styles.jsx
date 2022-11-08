import { Box, MenuItem, styled, Typography } from "@mui/material";
import { Button } from "@mui/material";


export const LogoWrapper = styled(Box)(({ theme }) => ({
  height: 67,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export const SideBarItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: 10,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: 10,
  "&.Mui-selected": {
    backgroundColor: "#f6f6f6",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#f6f6f6",
  },
}));

export const SideBarSubItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: 10,
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: 10,
  "&.Mui-selected": {
    backgroundColor: "#f6f6f6",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#f6f6f6",
  },
}));

export const SidebarSectionText = styled(Typography)(({ theme }) => ({
    paddingLeft: theme.spacing(2.5),
    fontSize: 15,
    fontWeight: 900,
    color: "#516272",
    fontFamily: "'Neue Haas Grotesk Text Pro', sans-serif;",
  }));

  export const CurrentUserContainer = styled(Box)(({ theme }) => ({
    display: "flex", 
    backgroundColor: "#f6f6f6", 
    borderRadius: theme.spacing(2)
  }));
