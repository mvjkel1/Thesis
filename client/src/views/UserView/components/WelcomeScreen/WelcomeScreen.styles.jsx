import { Box, Card, styled, Typography } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const MainContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

export const TitleWrapper = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto",
  fontSize: 25,
  fontWeight: 500,
}));

export const RecentFilesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: theme.spacing(1),
  border: "solid",
  borderRadius: theme.spacing(2),
  borderColor: theme.palette.border.main,
  padding: theme.spacing(2),
}));

export const FileCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.main,
  width: "28%",
  height: "fit-content",
  borderRadius: theme.spacing(3),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
}));

export const ChatCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.main,
  width: "100%",
  height: "fit-content",
  borderRadius: theme.spacing(3),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
}));

export const StyledCalendar = styled(Calendar)(({ theme }) => ({
  '.rbc-off-range-bg':{
    backgroundColor: theme.palette.neutral.light
  },
  '.rbc-today':{
    backgroundColor: theme.palette.neutral.main
  },
  '.rbc-active':{
    backgroundColor: theme.palette.neutral.light
  }
}));
