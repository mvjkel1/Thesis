import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { ChatCard, FileCard, MainContainer, RecentFilesContainer } from "./WelcomeScreen.styles";
import MyCalendar from "./Calendar";

const localizer = momentLocalizer(moment);

const WelcomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <MainContainer >
      <Box className="welcomeTextWrapper">
        <Typography 
        sx={{
          fontFamily: "Roboto",
          fontSize: 25,
          fontWeight: 500
        }}>Recently happening</Typography>
      </Box>
    <RecentFilesContainer>
      <FileCard elevation={0} sx={{backgroundColor: "#f8f7f3"}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            bogus123's file
          </Typography>
          <Typography>Grafika_komp.pdf</Typography>
        </CardContent>
      </FileCard>
      <FileCard elevation={0} sx={{backgroundColor: "#eef9fb"}}>
         <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            bogus123's file
          </Typography>
          <Typography>Grafika_komp.pdf</Typography>
        </CardContent>
      </FileCard>
      <FileCard elevation={0} sx={{       backgroundColor: "#f4f6fa"}}>
         <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            bogus123's file
          </Typography>
          <Typography>Grafika_komp.pdf</Typography>
        </CardContent>
      </FileCard>
      <ChatCard elevation={0} sx={{backgroundColor: "#f4f6fa"}}>
         <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            bogus123 said:
          </Typography>
          <Typography>Hello world lorem ipsum bla bla bla</Typography>
        </CardContent>
      </ChatCard>
    </RecentFilesContainer>

    <RecentFilesContainer>
      <MyCalendar/>
    </RecentFilesContainer>
    
    </MainContainer>
  );
};

export default WelcomeScreen;
