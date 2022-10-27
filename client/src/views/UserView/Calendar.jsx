import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from 'moment'
import { useState } from 'react';
import MainSkeleton from './skeletons/MainSkeleton';
import { Box, Typography } from '@mui/material';

const localizer = momentLocalizer(moment)

const MyCalendar = props => {

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000)

  return (
    <Box>
      {isLoading ?
        <MainSkeleton/> : 
        <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      }
    </Box>
  );
}

export default MyCalendar