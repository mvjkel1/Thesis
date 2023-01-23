import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { requestResetToken, resetPassword } from './recovery.service';
import {
  FormBox,
  FormContainer,
  FormInputContainer,
  MailAnimationWrapper,
  SecondaryButton,
  SubmitButton
} from './RecoveryForm.styles';

export default function RecoveryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenSent, setIsTokenSent] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { ref: emailRef, ...emailProps } = register(
    'email',
    !token && {
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
    }
  );

  const { ref: passwordRef, ...passwordProps } = register(
    'password',
    token && {
      required: t('auth.passwordrequired')
    }
  );
  const { ref: passwordConfirmRef, ...passwordConfirmProps } = register(
    'passwordConfirm',
    token && {
      required: t('auth.passwordrequired')
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
        setMessage('Success. You can log in now.');
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
          <Box sx={{ width: '200%' }}>
            <LinearProgress />
          </Box>
        )}
        <FormContainer>
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('auth.passwordrecovery')}
          </Typography>
          <Typography>{message}</Typography>
          <FormInputContainer component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <SubmitButton type="submit" fullWidth variant="contained">
                {t('auth.submit')}
              </SubmitButton>
            )}
            <SecondaryButton
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/auth')}
            >
              {t('auth.backtologin')}
            </SecondaryButton>
            <Grid container>
              <Grid item xs>
                <Link to="/auth/recovery">
                  <Typography variant="body2">{t('auth.forgotpassword')}</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/auth">
                  <Typography variant="body2">{t('auth.demo')}</Typography>
                </Link>
              </Grid>
            </Grid>
          </FormInputContainer>
        </FormContainer>
      </FormBox>
    </React.Fragment>
  );
}
