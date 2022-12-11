import * as React from 'react';
import { Typography } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Box } from '@mui/system';

const Description = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}
  >
    <Box sx={{ alignSelf: 'start' }}>
      <div className="float">
        <img src="/assets/planet.svg" width="100" height="100" className="planet spin" />
      </div>
    </Box>
    <Typography fontSize="2.5rem" fontWeight="500">
      Create. Collaborate. Win.
    </Typography>
    <Typography sx={{ alignSelf: 'start' }} mt={-1} fontSize="1.5rem" fontWeight="500">
      it has never been easier.
    </Typography>
  </Box>
);

export default Description;
