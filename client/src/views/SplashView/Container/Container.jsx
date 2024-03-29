import Grid from '@mui/material/Grid';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import DesktopSplash from '../../../components/DesktopSplash/DesktopSplash';

const Container = () => {
  return (
    <React.Fragment>
      <Grid
        container
        mb={8}
        columns={10}
        sx={{
          maxWidth: '1080px'
        }}
      >
        <Grid
          item
          xs={0}
          sm={0}
          md={6}
          lg={6}
          xl={6}
          display={{
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex',
            xl: 'flex'
          }}
          sx={{
            flexDirection: 'column',
            alignItems: 'center'
          }}
          bgcolor="background.dark"
        >
          <DesktopSplash />
        </Grid>

        <Grid
          item
          xs={10}
          sm={10}
          md={4}
          lg={4}
          xl={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '1rem',
            zIndex: '3'
          }}
          bgcolor="background.light"
        >
          <Outlet />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Container;
