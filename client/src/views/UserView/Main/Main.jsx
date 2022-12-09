import { Box, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Stack direction="column" spacing={4} alignItems="center">
      <Box sx={{ width: "100%", minHeight: "100vh" }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Main;
