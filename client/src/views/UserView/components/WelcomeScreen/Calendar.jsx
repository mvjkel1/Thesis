import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { StyledCalendar } from "./WelcomeScreen.styles";

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box>
      <StyledCalendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Box>
  );
};

export default MyCalendar;
