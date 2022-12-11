import { Grid, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import ResponsiveAppBar from './Appbar';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import { Rightbar } from './Rightbar/Rightbar';
import Sidebar from './Sidebar/Sidebar';

const UserView = () => {
  const theme = useTheme();
  return (
    <Box bgcolor="background.main" sx={{ minHeight: '100vh' }}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sm={12}
          md={0}
          lg={0}
          xl={0}
          display={{
            xs: 'flex',
            sm: 'flex',
            md: 'none',
            lg: 'none',
            xl: 'none'
          }}
        >
          <ResponsiveAppBar />
        </Grid>
        <Grid
          item
          xs={0}
          sm={0}
          md={2.5}
          lg={2.5}
          xl={2.5}
          display={{
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex',
            xl: 'flex'
          }}
          sx={{
            borderRight: '1px solid',
            borderColor: theme.palette.border.main
          }}
          bgcolor="background.light"
        >
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6.25}
          lg={6.25}
          xl={6.25}
          sx={{
            minHeight: 'calc(100vh - 64px)',
            borderColor: theme.palette.border.main,
            paddingLeft: 2,
            paddingRight: 2
          }}
          bgcolor="background.light"
        >
          <Main />
          <Footer />
        </Grid>
        <Grid
          item
          xs={0}
          sm={0}
          md={3.25}
          lg={3.25}
          xl={3.25}
          display={{
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex',
            xl: 'flex'
          }}
          sx={{
            borderLeft: '1px solid',
            borderColor: theme.palette.border.main,
            paddingLeft: 2
          }}
          bgcolor="background.light"
        >
          <Rightbar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserView;
