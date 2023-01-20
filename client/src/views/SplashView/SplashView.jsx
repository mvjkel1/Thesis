import { Box, Grid, Typography } from '@mui/material';
import { MobileTest } from '../../components/MobileTest/MobileTest';
import AuthContainer from './AuthContainer';

const SplashView = () => {
  return (
    <Box
      sx={{
        width: '100%',
        alignItems: 'center',
        height: '100%'
      }}
      bgcolor="background.dark"
    >
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '100%'
        }}
      >
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
          <MobileTest />
        </Grid>
        <Grid
          item
          xs={0}
          sm={0}
          md={12}
          lg={12}
          xl={12}
          mt={2}
          justifyContent="flex-start"
          display={{
            xs: 'none',
            sm: 'none',
            md: 'flex',
            lg: 'flex',
            xl: 'flex'
          }}
        >
          <Box ml={2} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img height="30" src="/assets/logo.svg" />
            <Typography fontSize="1.5rem" fontWeight={500}>
              &nbsp;StudentShare
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          id="auth"
          xs={12}
          ml={2}
          mr={2}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
          marginTop={{
            xs: 2,
            sm: 2
          }}
          minHeight={{
            xs: '-webkit-fill-available',
            sm: '-webkit-fill-available',
            md: '0vh',
            lg: '0vh',
            xl: '0vh'
          }}
          alignItems={{
            xs: 'center',
            sm: 'center',
            md: 'flex-start',
            lg: 'flex-start',
            xl: 'flex-start'
          }}
        >
          <AuthContainer />
        </Grid>
        <Grid
          item
          mb={1}
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'flex-end'
          }}
          justifyContent={{
            xs: 'center',
            sm: 'center',
            md: 'flex-start',
            lg: 'flex-start',
            xl: 'flex-start'
          }}
          marginLeft={{
            md: 2,
            lg: 2,
            xl: 2
          }}
        >
          <Typography fontSize={15} color="text.secondary">
            2022-2023 Student Share
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SplashView;
