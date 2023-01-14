import { Box, Card, styled, Typography, IconButton, Badge } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export const TitleWrapper = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontFamily: 'Roboto',
  fontSize: 18,
  fontWeight: 500,
  color: theme.palette.text.primary
}));

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

export const RecentlyActiveContainer = styled(Box)(({ theme }) => ({
  boxShadow: theme.mode == 'light' ? '-25px 25px 32px -4px rgba(241, 241, 249, 1)' : 'none',
  borderRadius: theme.spacing(2)
}));

export const SettingsIconButton = styled(IconButton)(({ theme }) => ({
  border: 'solid',
  borderWidth: '1px',
  borderColor: theme.palette.border.light
}));

export const UserSettingsIcon = styled(SettingsIcon)(({ theme }) => ({
  color: theme.palette.text.primary
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
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));