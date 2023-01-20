import { styled, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export const SettingsIconButton = styled(IconButton)(({ theme }) => ({
  border: 'solid',
  borderWidth: '1px',
  borderColor: theme.palette.border.light
}));

export const UserSettingsIcon = styled(SettingsIcon)(({ theme }) => ({
  color: theme.palette.text.primary
}));
