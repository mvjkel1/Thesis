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


export const EventNameInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  width: '100%',
  alignSelf: 'flex-start'
}));

export const EventDescriptionInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  width: '100%'
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1)
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(4),
  backgroundColor: '#8361e8',
  marginLeft: theme.spacing(2),
  width: '30%',
  height: '56px'
}));
