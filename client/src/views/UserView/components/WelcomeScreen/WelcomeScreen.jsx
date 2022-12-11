import { Box, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import MyCalendar from './Calendar';
import {
  CalendarContainer,
  ChatCard,
  FileCard,
  MainContainer,
  RecentFilesContainer
} from './WelcomeScreen.styles';

const WelcomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <MainContainer>
      <Box className="welcomeTextWrapper">
        <Typography
          color="text.primary"
          sx={{
            fontFamily: 'Roboto',
            fontSize: 25,
            fontWeight: 500
          }}
        >
          Recently happening
        </Typography>
      </Box>
      <RecentFilesContainer>
        <FileCard elevation={0}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              bogus123's file
            </Typography>
            <Typography color="text.primary">Grafika_komp.pdf</Typography>
          </CardContent>
        </FileCard>
        <FileCard elevation={0}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              bogus123's file
            </Typography>
            <Typography color="text.primary">Grafika_komp.pdf</Typography>
          </CardContent>
        </FileCard>
        <FileCard elevation={0}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              bogus123's file
            </Typography>
            <Typography color="text.primary">Grafika_komp.pdf</Typography>
          </CardContent>
        </FileCard>
        <ChatCard elevation={0}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              bogus123 said:
            </Typography>
            <Typography color="text.primary">Hello world lorem ipsum bla bla bla</Typography>
          </CardContent>
        </ChatCard>
      </RecentFilesContainer>

      <CalendarContainer>
        <MyCalendar />
      </CalendarContainer>
    </MainContainer>
  );
};

export default WelcomeScreen;
