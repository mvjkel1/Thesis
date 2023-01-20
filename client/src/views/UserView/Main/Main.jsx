import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <Stack direction="column" spacing={4} alignItems="center" sx={{ minHeight: '100vh' }}>
      <Box sx={{ width: '100%' }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Main;
