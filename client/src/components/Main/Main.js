import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { toggleRegisterPrompt, toggleLoginPrompt } from "../../actions/prompt";
import { StyledBox } from "../styling";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export const Main = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
          <StyledBox
            sx={{
              height: "70vh !important",
              flexDirection: "column !important",
              justifyContent: "space-around !important",
            }}
          >
            <Box>
              <Typography
                sx={{ color: "white", fontWeight: 600, fontSize: 30 }}
              >
                Hello, I am the default view.
              </Typography>
              <Typography
                sx={{ color: "white", fontWeight: 600, fontSize: 30 }}
              >
                As nothing's here, consider logging in or signing up.
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  width: "10vw",
                  fontSize: 20,
                  borderRadius: 20,
                  margin: 2,
                }}
                onClick={() => {
                  dispatch(toggleRegisterPrompt(true));
                }}
              >
                Register
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "10vw",
                  fontSize: 20,
                  borderRadius: 20,
                  margin: 2,
                }}
                onClick={() => {
                  dispatch(toggleLoginPrompt(true));
                }}
              >
                Log In
              </Button>
            </Box>
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};
