import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";

export const SideMenu = () => {
  const ContentHeader = styled(ListItem)({
    "& ": {
      borderColor: "black",
      backgroundColor: "#2F2F2F",
      borderWidth: 2,
      borderRadius: 20,
      padding: 15,
      borderWidth: "10px",
      textAlign: "left",
    },
  });
  const Content = styled(Typography)({
    "& ": {
      color: "white",
      fontWeight: 500,
      fontSize: 20,
    },
  });

  return (
    <div id="thread">
      <Box
        sx={{ height: "100%" }}
        display={{ xs: "none", sm: "none", md: "flex", lg: "flex" }}
      >
        <Grid sx={{ height: "100%" }} container spacing={2}>
          <Grid sx={{ display: "flex" }} item xs={0} sm={12} md={12} lg={12}>
            <ContentHeader
              id="side"
              sx={{ flexDirection: "column", display: "flex" }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ backgroundColor: "#0097d7", height: 10 }} />
                <Box sx={{ backgroundColor: "#d0f4de", height: 10 }} />
              </Box>
              <Content id="sidetitle">Hello.</Content>
              <Content id="sidetext">
                This is a #4 task for Intern dev program.
              </Content>
              <Content id="sidetext">
                Tech stack includes: React, Redux, MUI, jsonwebtoken, bcryptjs,
                node, express, mongoDB
              </Content>
            </ContentHeader>
          </Grid>

          <Grid sx={{ display: "flex" }} item xs={12}>
            <ContentHeader>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Content>Sample second</Content>
                    <Content>sidebar</Content>
                    <Content>element.</Content>
                  </React.Fragment>
                }
              />
            </ContentHeader>
          </Grid>

          <Grid sx={{ display: "flex" }} item xs={12}>
            <ContentHeader>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Content>Sample third</Content>
                    <Content>sidebar</Content>
                    <Content>element.</Content>
                  </React.Fragment>
                }
              />
            </ContentHeader>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
