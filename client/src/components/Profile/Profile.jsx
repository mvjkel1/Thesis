import { Alert, Avatar, Button, Collapse, Divider, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { login, updateUserData } from '../../redux/actions/auth';
import { changeDetails, changePassword } from './Profile.service';
import { FeatureContainer, FormInput, HeaderText, NameInput, SectionText } from './Profile.styles';
import CloseIcon from '@mui/icons-material/Close';

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [deletionMode, setDeletionMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const { ref: nameRef, ...nameProps } = register('name', {
    required: 'Name is required!',
    minLength: {
      value: 2,
      message: 'Name is too short'
    },
    maxLength: {
      value: 64,
      message: 'Name is too long'
    }
  });
  const { ref: emailRef, ...emailProps } = register('email', {
    required: 'Email is required!',
    minLength: {
      value: 2,
      message: 'Email is too short'
    },
    maxLength: {
      value: 64,
      message: 'Email is too long'
    }
  });
  const { ref: oldPasswordRef, ...oldPasswordProps } = register(
    'oldPassword',
    passwordMode && {
      required: 'Old password is required!',
      minLength: {
        value: 2,
        message: 'Old password is too short'
      },
      maxLength: {
        value: 64,
        message: 'Old pasword is too long'
      }
    }
  );
  const { ref: newPasswordRef, ...newPasswordProps } = register(
    'newPassword',
    passwordMode && {
      required: 'New password is required!',
      minLength: {
        value: 2,
        message: 'New password is too short'
      },
      maxLength: {
        value: 64,
        message: 'New pasword is too long'
      }
    }
  );
  const { ref: newPasswordConfirmRef, ...newPasswordConfirmProps } = register(
    'newPasswordConfirm',
    passwordMode && {
      required: 'New password is required!',
      minLength: {
        value: 2,
        message: 'New password is too short'
      },
      maxLength: {
        value: 64,
        message: 'New pasword is too long'
      }
    }
  );
  const getProfileData = (id) => {
    // gets profile data if id param is provided
    // for no param, current user is displayed so this
    // function is not used then
  };

  const setInitialFormValues = () => {
    let values = {};
    values.name = user.name;
    values.email = user.email;
    reset({
      ...values,
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    });
  };

  const doChangePassword = (oldPassword, newPassword, newPasswordConfirm, token) => {
    return new Promise((resolve, reject) => {
      changePassword(oldPassword, newPassword, newPasswordConfirm, token)
        .then(() => {
          dispatch(login(user.email, newPassword));
          setPasswordMode(false);
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  const doChangeDetails = (username, email, token) => {
    return new Promise((resolve, reject) => {
      changeDetails(username, email, token)
        .then((data) => {
          dispatch(updateUserData(data.user)); // Update state with new data.
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError('');
    let action = {};
    if (passwordMode)
      action = doChangePassword(
        data.oldPassword,
        data.newPassword,
        data.newPasswordConfirm,
        user.token
      );
    else action = doChangeDetails(data.name, data.email, user.token);

    action
      .then(() => {
        setIsSuccess(true);
      })
      .catch((err) => {
        setError(err);
        setIsSuccess(false);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setInitialFormValues();
  }, [user]);

  return (
    <FeatureContainer
      sx={{ paddingLeft: 3 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Collapse in={isSuccess || error}>
        <Alert
          severity={error ? 'error' : 'success'}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                error ? setError(false) : setIsSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {isSuccess ? 'Successfully changed data.' : error}
        </Alert>
      </Collapse>
      <HeaderText>Profile</HeaderText>
      <Box mt={2} mb={3}>
        <SectionText>Avatar</SectionText>
        <Box mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ height: 58, width: 58 }}
            alt={user.name}
            src="/static/images/avatar/1.jpg"
          />
          <Button sx={{ marginLeft: 2 }} variant="outlined" color="primary">
            Upload
          </Button>
          <Button sx={{ marginLeft: 2 }} variant="outlined" color="secondary">
            Remove
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex' }} mt={2} mb={3}>
        <Box mr={0.5} sx={{ width: '50%' }}>
          <SectionText>Username</SectionText>
          <FormInput
            fullWidth
            margin="normal"
            required
            name="name"
            id="name"
            placeholder="Name"
            inputRef={nameRef}
            disabled={passwordMode}
            {...nameProps}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Box>
        <Box ml={0.5} sx={{ width: '50%' }}>
          <SectionText>E-mail</SectionText>
          <FormInput
            fullWidth
            margin="normal"
            required
            name="email"
            id="email"
            placeholder="Email"
            inputRef={emailRef}
            disabled={passwordMode}
            {...emailProps}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        </Box>
      </Box>
      <Divider />
      <Box
        mt={2}
        mb={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <SectionText sx={{ mb: 2 }}>Password</SectionText>
        <Button variant="outlined" color="primary" onClick={() => setPasswordMode(true)}>
          Change password
        </Button>
        <Collapse in={passwordMode} sx={{ width: '50%' }}>
          <Box mt={2}>
            <FormInput
              fullWidth
              margin="normal"
              required
              name="oldPassword"
              id="oldPasssword"
              type="password"
              placeholder="Old password"
              inputRef={oldPasswordRef}
              {...oldPasswordProps}
              error={!!errors.oldPassword}
              helperText={errors?.oldPassword?.message}
            />
          </Box>
          <Box mt={1} mb={1}>
            <FormInput
              fullWidth
              margin="normal"
              required
              name="newPassword"
              id="newPassword"
              type="password"
              placeholder="New password"
              inputRef={newPasswordRef}
              {...newPasswordProps}
              error={!!errors.newPassword}
              helperText={errors?.newPassword?.message}
            />
          </Box>
          <Box mt={1} mb={1}>
            <FormInput
              fullWidth
              margin="normal"
              required
              name="newPasswordConfirm"
              id="newPasswordConfirm"
              type="password"
              placeholder="New password (confirm)"
              inputRef={newPasswordConfirmRef}
              {...newPasswordConfirmProps}
              error={!!errors.newPasswordConfirm}
              helperText={errors?.newPasswordConfirm?.message}
            />
          </Box>
        </Collapse>
      </Box>
      <Divider />
      <Box
        mt={2}
        mb={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <SectionText sx={{ mb: 2 }}>Danger area</SectionText>
        <Button variant="outlined" color="warning">
          Delete account
        </Button>
      </Box>
      <Divider />
      <Box mt={2} mb={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          disabled={isLoading}
          disableElevation
          variant="contained"
          color="primary"
        >
          Save changes
        </Button>
      </Box>
    </FeatureContainer>
  );
};
