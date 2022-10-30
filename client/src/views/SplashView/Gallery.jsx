import * as React from "react";
import { Typography } from "@mui/material"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box } from "@mui/system";


const Gallery = () => (
    <Box sx={{display: "flex", position: "relative"}}>
    <Carousel autoPlay showThumbs={false} showIndicators={false} showStatus={false} showArrows={false}>
      <div>
        <img alt="" src="assets/carousel-1.png" />
      </div>
      <div>
        <img alt="" src="assets/carousel-2.png" />
      </div>
    </Carousel>
    </Box>
  );

export default Gallery;
  