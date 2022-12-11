import { Box, Card, styled, Typography } from '@mui/material';

export const TitleWrapper = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontFamily: 'Roboto',
  fontSize: 25,
  fontWeight: 500,
  color: theme.palette.text.primary
}));

export const UserEntryContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.main,
  width: '100%',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1),
  margin: theme.spacing(0.7)
}));
