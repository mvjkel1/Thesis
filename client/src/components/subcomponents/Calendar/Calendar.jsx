import {
  Appointments,
  AppointmentTooltip,
  MonthView
} from '@devexpress/dx-react-scheduler-material-ui';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import moment from 'moment';
import {
  StyledLayout,
  StyledMonthViewLayout,
  StyledScheduler,
  StyledTimeScaleLayout,
  StyledWeekView,
  StyledWeekViewDayScaleRow
} from './Calendar.styles';
import { Button, Grid } from '@mui/material';
import { deleteEvent } from './Calendar.service';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import { getEvents } from '../../../redux/actions/events';
import { useState } from 'react';

const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <Grid item mt={1} xs={2} sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PersonIcon />
        </Box>
      </Grid>
      <Grid item mt={1} xs={10}>
        <span>{appointmentData.createdBy.name}</span>
      </Grid>
      <Grid item mt={2} xs={2} sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SchoolIcon />
        </Box>
      </Grid>
      <Grid item mt={2} xs={10}>
        <span>{appointmentData.class?.name}</span>
      </Grid>
      <Grid item mt={2} xs={2} sx={{ justifyContent: 'center'}}>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <DescriptionIcon />
        </Box>
      </Grid>
      <Grid item mt={2} xs={10}>
        <span>{appointmentData?.description}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

const Header = ({ children, appointmentData, onDeleteButtonClick, user, ...restProps }) => {
  const isOwner = user._id == appointmentData.createdBy._id;
  return (
    <AppointmentTooltip.Header
      {...restProps}
      appointmentData={appointmentData}
      onDeleteButtonClick={onDeleteButtonClick}
      showDeleteButton={isOwner}
    />
  );
};

export const Calendar = () => {
  const events = useSelector((state) => state.events);
  const user = useSelector((state) => state.auth.user);
  const currentWorkgroup = useSelector((state) => state.workgroups.currentWorkgroup);
  const token = useSelector((state) => state.auth?.user?.token);
  const [mode, setMode] = useState('Week');
  const dispatch = useDispatch();

  //TBD: change it to custom header component that checks if user owns the event to render del button.
  const commitChanges = ({ added, changed, deleted }) => {
    if (deleted !== undefined) {
      console.log('deletion');
      deleteEvent(currentWorkgroup?._id, deleted, token).then(() =>
        dispatch(getEvents(currentWorkgroup._id, token))
      );
    }
  };

  const ViewSwitch = () => {
    const handleButtonClick = () => {
      setMode(mode == 'Week' ? 'Month' : 'Week');
    };
    return (
      <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
        <Button sx={{ flex: 1 }} onClick={handleButtonClick}>
          {mode.charAt(0)}
        </Button>
      </Box>
    );
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      <StyledScheduler data={events.data || []} height={660}>
        <EditingState onCommitChanges={commitChanges} />
        <ViewState defaultCurrentDate={moment()} currentViewName={mode} />
        <StyledWeekView
          startDayHour={9}
          dayScaleRowComponent={StyledWeekViewDayScaleRow}
          timeScaleLayoutComponent={StyledTimeScaleLayout}
          layoutComponent={StyledLayout}
          dayScaleEmptyCellComponent={() => <ViewSwitch />}
        />
        <MonthView layoutComponent={StyledMonthViewLayout} />
        <IntegratedEditing />
        <Appointments />
        <AppointmentTooltip
          contentComponent={Content}
          headerComponent={({ ...props }) => <Header {...props} user={user} />}
          showDeleteButton
        />
      </StyledScheduler>
    </Box>
  );
};

export default Calendar;
