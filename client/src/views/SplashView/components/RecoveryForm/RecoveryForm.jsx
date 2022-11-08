import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { requestResetToken, resetPassword } from "./recovery.service";
import {
  FormBox,
  FormContainer,
  FormInputContainer,
  FormWrapper,
  MailAnimationWrapper,
  SecondaryButton,
  SubmitButton,
} from "./RecoveryForm.styles";

export default function RecoveryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenSent, setIsTokenSent] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ref: emailRef, ...emailProps } = register(
    "email",
    !token && {
      required: "E-mail is required",
      minLength: {
        value: 8,
        message: "Email is too short",
      },
      maxLength: {
        value: 64,
        message: "Email is too long",
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address.",
      },
    }
  );

  const { ref: passwordRef, ...passwordProps } = register(
    "password",
    token && {
      required: "Password is required.",
    }
  );
  const { ref: passwordConfirmRef, ...passwordConfirmProps } = register(
    "passwordConfirm",
    token && {
      required: "Password is required.",
    }
  );

  const sendResetToken = (data) => {
    setIsLoading(true);
    return requestResetToken(data)
      .then((message) => {
        setMessage(message);
        setIsTokenSent(true);
      })
      .catch((error) => {
        setMessage(error);
      })
      .finally(() => setIsLoading(false));
  };

  const doResetPassword = (data, token) => {
    setIsLoading(true);
    return resetPassword(data, token)
      .then(() => {
        setMessage("Success. You can log in now.");
      })
      .catch((error) => {
        setMessage(error);
        setIsLoading(false);
      });
  };

  const onSubmit = (data) => {
    let action = {};
    if (token) action = doResetPassword;
    else action = sendResetToken;
    action(data, token);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <FormBox>
        {isLoading && (
          <Box sx={{ width: "200%" }}>
            <LinearProgress />
          </Box>
        )}
        <FormContainer>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            "Password recovery"
          </Typography>
          <Typography>token: {token}</Typography>
          <Typography>{message}</Typography>
          <FormInputContainer
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {!isTokenSent && !token && (
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

            {token && (
              <React.Fragment>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="New password"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  inputRef={passwordRef}
                  {...passwordProps}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="passwordConfirm"
                  label="Confirm new password"
                  name="passwordConfirm"
                  autoComplete="passwordConfirm"
                  autoFocus
                  inputRef={passwordConfirmRef}
                  {...passwordConfirmProps}
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                />
              </React.Fragment>
            )}

            {isTokenSent && (
              <MailAnimationWrapper>
                <img src="/assets/mail-gif.gif" height="200" />
              </MailAnimationWrapper>
            )}

            {!isTokenSent && (
              <SubmitButton
                type="submit"
                color="primaryCtaButton"
                fullWidth
                variant="contained"
              >
                Submit
              </SubmitButton>
            )}
            <SecondaryButton
              color="secondaryCtaButton"
              fullWidth
              variant="outlined"
              onClick={() => navigate("/auth")}
            >
              Go back to log-in.
            </SecondaryButton>
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
          </FormInputContainer>
        </FormContainer>
      </FormBox>
    </React.Fragment>
  );
}
