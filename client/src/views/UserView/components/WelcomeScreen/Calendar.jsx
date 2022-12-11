import { Appointments, AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { Box } from '@mui/system';
import * as React from 'react';
import appointments from './today';
import {
  StyledLayout,
  StyledScheduler,
  StyledTimeScaleLayout,
  StyledWeekView,
  StyledWeekViewDayScaleEmptyCell,
  StyledWeekViewDayScaleRow
} from './WelcomeScreen.styles';

export const MyCalendar = () => (
  <Box sx={{ 'min-width': 0 }}>
    <StyledScheduler data={appointments} height={660}>
      <StyledWeekView
        startDayHour={9}
        endDayHour={19}
        dayScaleRowComponent={StyledWeekViewDayScaleRow}
        timeScaleLayoutComponent={StyledTimeScaleLayout}
        layoutComponent={StyledLayout}
        dayScaleEmptyCellComponent={StyledWeekViewDayScaleEmptyCell}
      />
      <Appointments />
      <AppointmentTooltip />
    </StyledScheduler>
  </Box>
);

export default MyCalendar;
