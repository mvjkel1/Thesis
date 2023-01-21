import { Badge, Box, Button, OutlinedInput, styled, TextField, Typography } from '@mui/material';

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

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));
