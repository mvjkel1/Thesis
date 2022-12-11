import { Box, Button, OutlinedInput, styled, TextField, Typography } from '@mui/material';

export const HeaderText = styled(Typography)({
  fontSize: 25,
  fontWeight: 700
});

export const SectionText = styled(Typography)({
  fontSize: 16,
  fontWeight: 700
});

export const FeatureContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  backgroundColor: theme.palette.neutral.main,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

export const FormInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: theme.spacing(1)
}));
