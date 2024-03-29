import { Grid, SwipeableDrawer, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import ResponsiveAppBar from './Appbar/Appbar';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import { Rightbar } from './Rightbar/Rightbar';
import Sidebar from './Sidebar/Sidebar';

const UserView = () => {
  const theme = useTheme();
  const drawer = useSelector((state) => state.theme.drawer);
  return (
    <>
      <SwipeableDrawer
        open={drawer}
        onClose={() => null}
        onOpen={() => null}
        PaperProps={{
          sx: { display: 'block', zIndex: 2, width: '100%' }
        }}
        hideBackdrop
      >
        <Sidebar passive />
      </SwipeableDrawer>
      <Box bgcolor="background.main">
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
            pl={{
              xs: 1.5,
              sm: 1.5,
              md: 2,
              lg: 2,
              xl: 2
            }}
            pr={{
              xs: 1.5,
              sm: 1.5,
              md: 2,
              lg: 2,
              xl: 2
            }}
            sx={{
              borderColor: theme.palette.border.main,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column'
            }}
            bgcolor="background.main"
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
              borderColor: theme.palette.border.main,
              paddingLeft: 2,
              overflow: 'hidden'
            }}
            bgcolor="background.light"
          >
            <Rightbar />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UserView;
