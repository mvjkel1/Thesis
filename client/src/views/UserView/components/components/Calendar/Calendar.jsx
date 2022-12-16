import {
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  MonthView,
  Toolbar,
  DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import * as React from 'react';
import {
  StyledLayout,
  StyledScheduler,
  StyledTimeScaleLayout,
  StyledWeekView,
  StyledWeekViewDayScaleEmptyCell,
  StyledWeekViewDayScaleRow
} from './Calendar.styles';
import { Grid } from '@mui/material';
import { deleteEvent } from './Calendar.service';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import { getEvents } from '../../../../../redux/actions/events';

const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item xs={2} sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PersonIcon />
        </Box>
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.createdBy.name}</span>
      </Grid>
      <Grid item xs={2} sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SchoolIcon />
        </Box>
      </Grid>
      <Grid item xs={10}>
        <span>{appointmentData.class?.name}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

export const Calendar = () => {
  const events = useSelector((state) => state.events);
  const currentWorkgroup = useSelector((state) => state.workgroups.currentWorkgroup);
  const token = useSelector((state) => state.auth?.user?.token);
  const dispatch = useDispatch();

  //TBD: change it to custom header component that checks if user owns the event to render del button.
  const commitChanges = ({ added, changed, deleted }) => {
    if (deleted !== undefined) {
      deleteEvent(currentWorkgroup?._id, deleted, token).then(() =>
        dispatch(getEvents(currentWorkgroup, token))
      );
    }
  };

  return (
    <Box sx={{ 'min-width': 0 }}>
      <StyledScheduler data={events.data || []} height={660}>
        <EditingState onCommitChanges={commitChanges} />
        <ViewState defaultCurrentDate="2022-12-13" />
        <Toolbar />
        <StyledWeekView
          dayScaleRowComponent={StyledWeekViewDayScaleRow}
          timeScaleLayoutComponent={StyledTimeScaleLayout}
          layoutComponent={StyledLayout}
          dayScaleEmptyCellComponent={StyledWeekViewDayScaleEmptyCell}
        />
        <DateNavigator />
        <IntegratedEditing />
        <Appointments />
        <AppointmentTooltip contentComponent={Content} showDeleteButton />
      </StyledScheduler>
    </Box>
  );
};

export default Calendar;
