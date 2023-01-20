import { Box, Button, OutlinedInput, styled, TextField, Typography } from '@mui/material';

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

export const HeaderText = styled(Typography)(({ theme }) => ({
  fontSize: 25,
  fontWeight: 500,
  color: theme.palette.text.primary
}));

export const FeatureContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  backgroundColor: theme.palette.neutral.light,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2)
}));
