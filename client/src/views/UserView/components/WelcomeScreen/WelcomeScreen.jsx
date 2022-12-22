import { Box, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import Calendar from '../components/Calendar/Calendar';
import ImageIcon from '@mui/icons-material/Image';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  CalendarContainer,
  ChatCard,
  FileCard,
  MainContainer,
  RecentFilesContainer
} from './WelcomeScreen.styles';

import { Chart, ArgumentAxis, ValueAxis, BarSeries } from '@devexpress/dx-react-chart-material-ui';

import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';

import { ageStructure } from './data';

import moment from 'moment';

import { useSelector } from 'react-redux';

const FileTypeCard = ({ files, name, extension, icon, ...props }) => {
  const count = Array.isArray(files) ? files.length : 0;
  return (
    <FileCard elevation={0} sx={{ padding: 2.5 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 4 }}>{icon}</Box>
        <Typography
          color="text.primary"
          sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}
        >
          {name}
        </Typography>
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
          <Typography color="text.secondary">{count}</Typography>
        </Box>
      </Box>
    </FileCard>
  );
};

let today = moment();
const getEventsData = (events) => {
  return [
    {
      when: 'today',
      count: events?.filter((event) => moment(event.endDate).diff(today, 'days') == 0).length
    },
    {
      when: [moment().add(1, 'days').format('dddd')],
      count: events?.filter((event) => moment(event.endDate).diff(today, 'days') == 1).length
    },
    {
      when: [moment().add(2, 'days').format('dddd')],
      count: events?.filter((event) => moment(event.endDate).diff(today, 'days') == 2).length
    },
    {
      when: [moment().add(3, 'days').format('dddd')],
      count: events?.filter((event) => moment(event.endDate).diff(today, 'days') == 3).length
    }
  ];
};

const WelcomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const files = useSelector((state) => state.classes.data)
    ?.map((class_) => class_.documents)
    .flat();
  const events = useSelector((state) => state.events);
  console.log(getEventsData(events.data));

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <MainContainer>
      <Box className="welcomeTextWrapper"></Box>
      <Box sx={{ display: 'flex' }}>
        <RecentFilesContainer sx={{ flexWrap: 'wrap' }}>
          <FileTypeCard
            files={files}
            name={'Images'}
            extension={'png'}
            icon={<ImageIcon sx={{ color: '#20a245' }} />}
          />
          <FileTypeCard
            files={files}
            name={'Docs'}
            extension={'pdf'}
            icon={<ArticleIcon sx={{ color: '#3f7af0' }} />}
          />
          <FileTypeCard
            files={files}
            name={'Videos'}
            extension={'.mp3'}
            icon={<PlayCircleIcon sx={{ color: '#fe4976' }} />}
          />
          <FileTypeCard
            files={files}
            name={'Others'}
            extension={''}
            icon={<InventoryIcon sx={{ color: '#6a4bfc' }} />}
          />
        </RecentFilesContainer>
        <RecentFilesContainer sx={{ display: 'flex', alignItems: 'stretch', padding: 0 }}>
          <FileCard elevation={0} sx={{ padding: 2, paddingBottom: 0 }}>
            <Typography
              color="text.primary"
              sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}
            >
              Events
            </Typography>
            <Chart data={getEventsData(events.data)} height={100}>
              <ArgumentScale factory={scaleBand} />
              <ArgumentAxis />

              <BarSeries valueField="count" argumentField="when" name="Young" />
              <Stack />
            </Chart>
          </FileCard>
        </RecentFilesContainer>
      </Box>

      <CalendarContainer>
        <Calendar />
      </CalendarContainer>
    </MainContainer>
  );
};

export default WelcomeScreen;
