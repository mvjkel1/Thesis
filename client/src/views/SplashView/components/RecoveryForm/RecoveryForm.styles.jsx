import { Box, Button, styled } from '@mui/material';

export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.light,
  overflow: 'hidden'
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  height: '100%'
}));

export const FormInputContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1)
}));

export const MailAnimationWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5)
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(-0.2),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5)
}));
