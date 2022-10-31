import * as React from "react";
import Grid from "@mui/material/Grid";
import Description from "./Description";
import { Outlet } from "react-router-dom";

const Auth2 = () => {
  return (
    <React.Fragment>
      <Grid
        container
        mb={8}
        columns={10}
        sx={{
          maxWidth: "1080px",
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
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
            xl: "flex",
          }}
          sx={{
            backgroundColor: "rgba(244,246,248,255)",
            flexDirection: "column",
            alignItems: "center",
          }}
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
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "0.5rem",
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Auth2;
