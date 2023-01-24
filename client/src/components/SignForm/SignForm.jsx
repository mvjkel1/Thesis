import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { registerAction } from '../../redux/actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Collapse, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FormBox,
  FormContainer,
  FormInputContainer,
  SecondaryButton,
  SubmitButton
} from './SignForm.styles';
import { joinGroup } from '../../redux/actions/workgroups';

export default function SignForm({ ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpMode, setSignUpMode] = useState(false);
  const [invitationToken] = useOutletContext() || [];
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const error = useSelector((state) => state.auth.error);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const { ref: nameRef, ...nameProps } = register(
    'name',
    signUpMode && {
      required: t('auth.namerequired'),
      minLength: {
        value: 2,
        message: t('auth.nametooshort')
      },
      maxLength: {
        value: 64,
        message: t('auth.nametoolong')
      }
    }
  );
  const { ref: emailRef, ...emailProps } = register('email', {
    required: t('auth.emailrequired'),
    minLength: {
      value: 8,
      message: t('auth.emailtooshort')
    },
    maxLength: {
      value: 64,
      message: t('auth.emailtoolong')
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: t('auth.emailinvalid')
    }
  });
  const { ref: passwordRef, ...passwordProps } = register('password', {
    minLength: {
      value: 8,
      message: t('auth.passwordtooshort')
    },
    maxLength: {
      value: 64,
      message: t('auth.passwordtoolong')
    },
    required: t('auth.passwordrequired')
  });
  const { ref: passwordConfirmRef, ...passwordConfirmProps } = register(
    'passwordConfirm',
    signUpMode && {
      minLength: {
        value: 8,
        message: t('auth.passwordtooshort')
      },
      maxLength: {
        value: 64,
        message: t('auth.passwordtoolong')
      },
      required: t('auth.passwordrequired'),
      validate: (val) => {
        if (watch('password') != val) {
          return t('auth.passwordsdonotmatch');
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
    // Not crucial for login/signup, so always resolved, does not break onSubmit flow.
    if (invToken)
      return new Promise((res) => dispatch(joinGroup(invToken, userToken)).finally(() => res()));
    else return Promise.resolve();
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    let action = signUpMode ? signUp : signIn;
    action(data)
      .then((data) => executeBeforeRedirect(invitationToken, data.token))
      .then(() => navigate('/'))
      .then(() => window.scrollTo(0,0))
      .finally(() => setIsLoading(false));
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
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
            {signUpMode ? t('auth.signup') : t('auth.signin')}
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
                label={t('auth.name')}
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
              label={t('auth.email')}
              name="email"
              autoComplete="email"
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
              label={t('auth.password')}
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
                label={t('auth.confirmpassword')}
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
              label={t('auth.rememberme')}
            />
            <SubmitButton type="submit" fullWidth variant="contained">
              {signUpMode ? t('auth.signup') : t('auth.signin')}
            </SubmitButton>
            <SecondaryButton
              color="secondary"
              fullWidth
              variant="outlined"
              onClick={() => {
                unregister(['name', 'email', 'passwordConfirm']);
                setSignUpMode(!signUpMode);
              }}
            >
              {signUpMode ? t('auth.backtologin') : t('auth.signupbutton')}
            </SecondaryButton>
            <Grid container>
              <Grid item xs>
                <Link style={{textDecoration: "none"}} to="/auth/recovery">
                  <Typography variant="body2">{t('auth.forgotpassword')}</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link style={{textDecoration: "none"}} to="">
                  <Typography
                    variant="body2"
                    onClick={() =>
                      signIn({ email: 'demouser@example.com', password: 'demo12345' }).then(() =>
                        navigate('/')
                      )
                    }
                  >
                    {t('auth.demo')}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </FormInputContainer>
        </FormContainer>
      </FormBox>
    </React.Fragment>
  );
}
