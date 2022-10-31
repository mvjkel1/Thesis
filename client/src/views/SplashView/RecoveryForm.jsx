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

export default function RecoveryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ref: emailRef, ...emailProps } = register("email", {
    required: "E-mail is required.",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address.",
    },
  });

  const { ref: passwordRef, ...passwordProps } = register(
    "password",
    false && {
      required: "Password is required.",
    }
  );
  const { ref: passwordConfirmRef, ...passwordConfirmProps } = register(
    "passwordConfirm",
    false && {
      required: "Password is required.",
    }
  );

  const reset = (data) => {
    // return dispatch(resetPassword...)
  };

  const request = () => {
    return new Promise((res) => setTimeout(res, 3000));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const action = {};
    request().then(() => {
      setIsSent(true);
      setIsLoading(false);
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        {isLoading && (
          <Box sx={{ width: "200%" }}>
            <LinearProgress />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            height: "100%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            "Password recovery"
          </Typography>
          <Typography>{error}</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            {!isSent && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={emailRef}
                {...emailProps}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            )}

            {isSent && (
              <Box
                className="mailWrapper"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img src="/assets/mail-gif.gif" height="200" />
              </Box>
            )}

            <Button
              type="submit"
              color="primaryCtaButton"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, pt: 1.5, pb: 1.5 }}
            >
              Request new password
            </Button>
            <Button
              color="secondaryCtaButton"
              fullWidth
              variant="outlined"
              sx={{ mt: -0.2, mb: 2, pt: 1.5, pb: 1.5 }}
              onClick={() => navigate("/auth")}
            >
              Go back to log-in.
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={() => navigate("/")}>
                  {"Our terms of service (TOS)"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
