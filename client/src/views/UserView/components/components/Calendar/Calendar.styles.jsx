import { Scheduler, WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import { Box, Card, styled, Typography } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column'
}));

export const TitleWrapper = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontSize: 25,
  fontWeight: 500
}));

export const RecentFilesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: theme.spacing(1),
  borderColor: theme.palette.border.main,
  padding: theme.spacing(0.5)
}));

export const CalendarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  backgroundColor: theme.palette.neutral.main,
  marginTop: theme.spacing(1),
  borderColor: theme.palette.border.main,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(2),
  margin: theme.spacing(1.3)
}));

export const FileCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.main,
  flex: 1,
  height: 'fit-content',
  borderRadius: theme.spacing(3),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1)
}));

export const ChatCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.main,
  width: '100%',
  height: 'fit-content',
  borderRadius: theme.spacing(3),
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1)
}));

export const StyledScheduler = styled(Scheduler)(({ theme }) => ({
  padding: '50px',
  '.MainLayout-flexRow': {
    padding: '100px'
  },
  '.rbc-today': {
    backgroundColor: theme.palette.neutral.main
  },
  '.rbc-active': {
    backgroundColor: theme.palette.neutral.light
  }
}));

export const StyledWeekView = styled(WeekView)(({ theme }) => ({
  '.MainLayout-background': {
    backgroundColor: 'red !important'
  },
  '.rbc-today': {
    backgroundColor: theme.palette.neutral.main
  },
  '.rbc-active': {
    backgroundColor: theme.palette.neutral.light
  }
}));

export const StyledWeekViewDayScaleRow = styled(WeekView.DayScaleRow)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.light // horizontal axis
}));

export const StyledWeekViewDayScaleEmptyCell = styled(WeekView.DayScaleEmptyCell)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.light // empty call,
}));

export const StyledTimeScaleLayout = styled(WeekView.TimeScaleLayout)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.light // vertical axis
}));

export const StyledLayout = styled(WeekView.Layout)(({ theme }) => ({
  // master style, override css here
  borderRadius: theme.spacing(3),
  '.MuiTableCell-root,.MainLayout-ordinaryLeftPanelBorder,.MainLayout-ordinaryHeaderBorder,.MainLayout-brightHeaderBorder':
    {
      borderColor: theme.palette.border.light,
      borderRightColor: theme.palette.border.light,
    },
  '.Appointment-clickableAppointment': {
    filter: theme.mode == 'dark' ? 'brightness(85%)' : '',
    color: 'white !important'
  },

}));
