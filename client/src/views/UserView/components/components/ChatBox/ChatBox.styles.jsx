import { Box, Button, OutlinedInput, styled, Typography } from '@mui/material';

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

export const HeaderText = styled(Typography)({
  fontSize: 25,
  fontWeight: 500
});

export const FeatureContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  backgroundColor: theme.palette.neutral.light,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

export const ChatBoxContainer = styled(Box)(({ theme}) => ({
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.neutral.light,
    borderRadius: "1rem",
    display: "grid",
    gridTemplateRows: "10vh 60vh 13vh",
}));

export const HeaderContainer = styled(Box)(({ theme}) => ({
    display: "flex",
    padding: theme.spacing(2)
}));


export const ChatsContainer = styled(Box)(({ theme}) => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1.5rem",
    overflow: "scroll"
}));

export const SenderContainer = styled(Box)(({ theme}) => ({
  background: theme.palette.neutral.light,
  display: "flex",
  justifyContent: "space-between",
  height: "3.5rem",
  alignItems: "center",
  gap: "1rem",
  padding: "0.8rem",
  bordeRadius: "1rem",
  alignSelf: "end",
}));


export const Message = styled(Box)(({ theme, own }) => ({
    background: own ? "lightblue" : "green",
    alignSelf: own ? "flex-end" : "flex-start",
    borderRadius: own ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
    color: "white",
    padding: "0.7rem",
    maxWidth: "28rem",
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
}));

export const SendButton = styled(Button)(({ theme}) => ({
    borderRadius: theme.spacing(4),
    backgroundColor: '#8361e8',
    marginLeft: theme.spacing(2),
    width: '30%'
}));