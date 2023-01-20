import { Box, styled, Badge } from '@mui/material';

export const UserEntryContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1),
  margin: theme.spacing(0.7)
}));

export const CurrentUserContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  borderRadius: theme.spacing(2),
  gap: theme.spacing(1)
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
