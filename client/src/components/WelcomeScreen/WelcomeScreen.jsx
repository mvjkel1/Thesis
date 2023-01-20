import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Calendar from '../subcomponents/Calendar/Calendar';
import ImageIcon from '@mui/icons-material/Image';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  CalendarContainer,
  EventBarContainer,
  FileCard,
  MainContainer,
  RecentFilesContainer
} from './WelcomeScreen.styles';
import mime from 'mime';
import { Chart, ArgumentAxis, BarSeries } from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { mapEventsData } from './dataMap';

const FileTypeCard = ({ files, name, extensions, icon, ...props }) => {
  const count = Array.isArray(files)
    ? files.filter((file) => extensions.includes(mime.getExtension(file.mimetype))).length
    : 0;
  return (
    <FileCard elevation={0} sx={{ padding: 2.5 }}>
      <Link style={{ textDecoration: 'none' }} to="/group-files" state={{ extensions, name }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 4 }}>{icon}</Box>
          <Typography
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}
            noWrap
          >
            {name}
          </Typography>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
            <Typography color="text.secondary">{count}</Typography>
          </Box>
        </Box>
      </Link>
    </FileCard>
  );
};

const WelcomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const groupFilesSelector = createSelector(
    (state) => state.classes?.data,
    (class_) => {
      return class_?.map((class_) => class_.documents).flat();
    }
  );
  const files = useSelector(groupFilesSelector);
  const events = useSelector((state) => state.events);
  const currentWorkgroup = useSelector((state) => state.workgroups.currentWorkgroup);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <MainContainer>
      <Box className="welcomeTextWrapper"></Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <RecentFilesContainer sx={{ flexWrap: 'wrap' }}>
          <FileTypeCard
            files={files}
            name={t('WelcomeScreen.images')}
            extensions={['png', 'jpg', 'jpeg']}
            icon={<ImageIcon sx={{ color: '#20a245' }} />}
          />
          <FileTypeCard
            files={files}
            name={t('WelcomeScreen.docs')}
            extensions={['pdf', 'docx', 'doc']}
            icon={<ArticleIcon sx={{ color: '#3f7af0' }} />}
          />
          <FileTypeCard
            files={files}
            name={t('WelcomeScreen.videos')}
            extensions={['mp3']}
            icon={<PlayCircleIcon sx={{ color: '#fe4976' }} />}
          />
          <FileTypeCard
            files={files}
            name={t('WelcomeScreen.others')}
            extensions={['exe']}
            icon={<InventoryIcon sx={{ color: '#6a4bfc' }} />}
          />
        </RecentFilesContainer>
        <EventBarContainer sx={{ display: 'flex', alignItems: 'stretch', padding: 0 }}>
          <FileCard elevation={0} sx={{ padding: 2.4, paddingBottom: currentWorkgroup ? 0 : 2.4 }}>
            <Typography
              color="text.primary"
              sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}
            >
              {t('WelcomeScreen.events')}
            </Typography>
            {currentWorkgroup ? (
              <Chart data={mapEventsData(events.data)} height={100}>
                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <BarSeries valueField="count" argumentField="when" name="Young" />
                <Stack />
              </Chart>
            ) : (
              <Typography>{t('WelcomeScreen.noevents')}</Typography>
            )}
          </FileCard>
        </EventBarContainer>
      </Box>

      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
    </MainContainer>
  );
};

export default WelcomeScreen;
