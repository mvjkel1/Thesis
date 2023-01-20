import { Typography, Box, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { switchMode } from '../../../redux/actions/theme';
import { useTranslation } from 'react-i18next';
import { DndSwitch, MaterialUISwitch, RecentlyActiveContainer } from './DisplaySettings.styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

export default function ToggleLanguage() {
  const { i18n } = useTranslation();
  const [alignment, setAlignment] = useState(i18n.language || 'en');
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    changeLanguage(event.target.value);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      sx={{ height: 30 }}
      onChange={handleAlignment}
      aria-label="text alignment"
      size="small"
    >
      <ToggleButton value="pl" aria-label="left aligned">
        PL
      </ToggleButton>
      <ToggleButton value="en" aria-label="centered">
        EN
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export const DisplaySettings = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <RecentlyActiveContainer sx={{ padding: 2 }}>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.primary">{t('displaySettings.displaymode')}</Typography>
          <MaterialUISwitch
            onClick={() => dispatch(mode == 'dark' ? switchMode('light') : switchMode('dark'))}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.primary">{t('displaySettings.notifications')}</Typography>
          <DndSwitch />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography color="text.primary">{t('displaySettings.language')}</Typography>
          <ToggleLanguage />
        </Box>
      </Stack>
    </RecentlyActiveContainer>
  );
};
