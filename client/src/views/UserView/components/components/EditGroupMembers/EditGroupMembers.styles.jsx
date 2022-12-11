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
  backgroundColor: theme.palette.neutral.main,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(2)
}));

export const LinkTextfield = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  '.MuiInputBase-inputAdornedEnd': {
    backgroundColor: 'lightgreen',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  '.MuiInputAdornment-positionEnd': {
    alignSelf: 'stretch',
    maxHeight: '100%',
    height: 'inherit'
  }
}));

export const GroupNameInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  width: '70%'
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(4),
  backgroundColor: '#8361e8',
  marginLeft: theme.spacing(2),
  width: '30%'
}));
