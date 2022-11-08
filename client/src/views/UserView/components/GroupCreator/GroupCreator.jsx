import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { FormWrapper, MainWrapper } from "./GroupCreator.styles";

export default function GroupCreator() {
  return (
    <React.Fragment>
      <Typography>Group Creator here!</Typography>
      <MainWrapper>
        <FormWrapper>
          <TextField placeholder="Group name" />
        </FormWrapper>
      </MainWrapper>
    </React.Fragment>
  );
}
