import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import { Box, Grid, Typography } from '@mui/material';
import AuthContainer from './AuthContainer';

const SplashView = () => {
  return (
    <Box
      sx={{
        width: '100%',
        alignItems: 'center'
      }}
      bgcolor="background.dark"
    >
      <Grid
        container
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Grid
          item
          xs={12}
          mt={2}
          justifyContent={{
            xs: 'center',
            sm: 'center',
            md: 'flex-start',
            lg: 'flex-start',
            xl: 'flex-start'
          }}
          sx={{display: "flex"}}
        >
          <Box ml={2} display={{xs: "none", sm: "none", md: "block", lg: "block", xl: "block"}}/>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <img height="30" src="/assets/logo.svg"/>
            <Typography fontSize="1.5rem" fontWeight={500}>
              &nbsp;StudentShare
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          ml={2}
          mr={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <AuthContainer />
        </Grid>
        <Grid
          item
          ml={2}
          mb={1}
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          <Typography>Copyright © 2022 StudentShare by B.K & M.S. All rights reserved.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SplashView;
