import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../../redux/actions/auth';
import { registerAction } from '../../../../redux/actions/auth';
import { useNavigate } from 'react-router-dom';
import { Collapse, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

import {
  FormBox,
  FormContainer,
  FormInputContainer,
  SecondaryButton,
  SubmitButton
} from './SignForm.styles';
import { joinGroup } from '../../../../redux/actions/workgroups';

export default function SignForm({ ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);
  const [invitationToken] = useOutletContext() || [];
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const { ref: nameRef, ...nameProps } = register(
    'name',
    signUpMode && {
      required: 'Name is required!',
      minLength: {
        value: 2,
        message: 'Name is too short'
      },
      maxLength: {
        value: 64,
        message: 'Name is too long'
      }
    }
  );
  const { ref: emailRef, ...emailProps } = register('email', {
    required: 'E-mail is required',
    minLength: {
      value: 8,
      message: 'Email is too short'
    },
    maxLength: {
      value: 64,
      message: 'Email is too long'
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address.'
    }
  });
  const { ref: passwordRef, ...passwordProps } = register('password', {
    minLength: {
      value: 8,
      message: 'Password is too short'
    },
    maxLength: {
      value: 64,
      message: 'Password is too long'
    },
    required: 'Password is required.'
  });
  const { ref: passwordConfirmRef, ...passwordConfirmProps } = register(
    'passwordConfirm',
    signUpMode && {
      minLength: {
        value: 8,
        message: 'Password is too short'
      },
      maxLength: {
        value: 64,
        message: 'Password is too long'
      },
      required: 'Password is required.',

      validate: (val) => {
        if (watch('password') != val) {
          return 'Your passwords do not match';
        }
      }
    }
  );

  const signIn = (data) => {
    return dispatch(login(data.email, data.password));
  };

  const signUp = (data) => {
    return dispatch(registerAction(data.name, data.email, data.password, data.passwordConfirm));
  };

  const executeBeforeRedirect = (invToken, userToken) => {
    if (invToken) return dispatch(joinGroup(invToken, userToken));
    else return Promise.resolve();
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    var action = {};
    if (signUpMode) action = signUp;
    else action = signIn;
    action(data)
      .then((data) => executeBeforeRedirect(invitationToken, data.token))
      .finally(() => {
        setIsLoading(false);
        navigate('/');
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <FormBox>
        {isLoading && (
          <Box sx={{ width: '200%' }}>
            <LinearProgress />
          </Box>
        )}
        <FormContainer>
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signUpMode ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Typography>{error}</Typography>
          <FormInputContainer
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
                inputRef={nameRef}
                {...nameProps}
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            </Collapse>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
              {...passwordProps}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <Collapse in={signUpMode}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                inputRef={passwordConfirmRef}
                {...passwordConfirmProps}
                error={!!errors.passwordConfirm}
                helperText={errors?.passwordConfirm?.message}
              />
            </Collapse>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <SubmitButton type="submit" fullWidth variant="contained">
              {signUpMode ? 'Sign Up' : 'Sign In'}
            </SubmitButton>
            <SecondaryButton
              color="secondary"
              fullWidth
              variant="outlined"
              onClick={() => setSignUpMode(!signUpMode)}
            >
              {signUpMode ? 'Back to login' : 'New user? Sign Up!'}
            </SecondaryButton>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" onClick={() => navigate('/auth/recovery')}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={() => setSignUpMode(true)}>
                  {'Our terms of service (TOS)'}
                </Link>
              </Grid>
            </Grid>
          </FormInputContainer>
        </FormContainer>
      </FormBox>
    </React.Fragment>
  );
}
