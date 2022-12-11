import Grid from '@mui/material/Grid';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Description from './components/Description/Description';

const Auth2 = () => {
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
          <Description />
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
            borderRadius: '0.5rem'
          }}
          bgcolor="background.main"
        >
          <Outlet />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Auth2;
