import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth";
import { registerAction } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { Collapse, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Auth from "./SignForm";
import Gallery from "./Gallery";
import { Outlet } from "react-router-dom";

const Auth2 = () => {

    return (
        <React.Fragment>
            <Grid mt={8} mb={8} columns={10} container sx={{height: "100%", width: "75vw", boxShadow: "11px 11px 27px -16px rgba(66, 68, 90, 1)", WebkitBoxShadow: "11px 11px 27px -16px rgba(66, 68, 90, 1)"}}>
                <Grid item xs={0} sm={0} md={5.25} lg={5.25} xl={5.25} display={{ xs: "none", sm: "none", md: "flex", lg: "flex", xl: "flex" }} sx={{
                    backgroundColor: "#a4c4b5",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography
                        mt={4} 
                        fontSize={24}
                    >
                        StudentShare
                    </Typography>
                    <Gallery/>
                </Grid>

                <Grid item xs={10} sm={10} md={4.75} lg={4.75} xl={4.75} sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Outlet/>
                
                </Grid>




            </Grid>
        </React.Fragment>
    )
}

export default Auth2;