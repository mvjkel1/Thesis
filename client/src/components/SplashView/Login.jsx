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
import { login } from "../../actions/auth";
import { registerAction } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { Collapse, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";


export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const {register, handleSubmit, formState: { errors }} = useForm();
  const { ref: nameRef, ...nameProps} = register(
    "name");
  const { ref: emailRef, ...emailProps} = register(
    "email", {
    required: "E-mail is required.",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address."
    }
  });
  const { ref: passwordRef, ...passwordProps } = register(
    "password", {
    required: "Password is required."
  });
  const { ref: passwordConfirmRef, ...passwordConfirmProps } = register(
    "passwordConfirm");

  const signIn = (data) => {
    return dispatch(login(data.email, data.password))
  }

  const signUp = (data) => {
    return dispatch(registerAction(data.name, data.email, data.password, data.passwordConfirm))
  }

  const onSubmit = (data) => {
    setIsLoading(true);
    var action = {};
    if(signUpMode) action = signUp;
    else action = signIn;
    action(data)
      .then(() => {navigate('/');})
      .finally(() => setIsLoading(false))
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#C5F5FF",
            border: "solid",
            borderColor: "#C5F5FF",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {isLoading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {signUpMode ? "Sign Up" : "Sign In"}
            </Typography>
            <Typography>{error}</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >

            <Collapse in={signUpMode}>
              <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              autoComplete="name"
              inputRef={nameRef} {...nameProps}
              error={!!errors.name}
              helperText={errors?.name?.message}
              />
            </Collapse>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={emailRef} {...emailProps}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef} {...passwordProps}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
              {signUpMode && <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm password"
              type="password"
              id="passwordConfirm"
              autoComplete="current-password"
              inputRef={passwordConfirmRef} {...passwordConfirmProps}
              error={!!errors.passwordConfirm}
              helperText={errors?.passwordConfirm?.message}
            />}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {signUpMode ? "Sign Up" : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={() => setSignUpMode(true)}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
