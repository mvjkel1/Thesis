import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Collapse, IconButton, InputAdornment, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkgroups } from '../../../../../redux/actions/workgroups';
import { addClass } from './AddClass.service';
import {
  FeatureContainer,
  FormContainer,
  GroupNameInput,
  HeaderText,
  HeaderWrapper,
  LinkTextfield,
  SubmitButton
} from './AddClass.styles';

export default function AddClass({openByDefault, ...props}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(openByDefault || false);
  const token = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();

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

  const showAlert = (type, message) => {
    type == 'error' ? setError(message) : setIsSuccess(true);
    setTimeout(() => (type == 'error' ? setError('') : setIsSuccess(false)), 2500);
  };

  const onSubmit = (data) => {
    setError('');
    setIsSuccess(false);
    setIsLoading(true);
    addClass(data.name, token)
      .then(() => {
        showAlert('success');
        setUrl('https://blabla.com/invite/322-bfdda-sgaw');
        dispatch(getWorkgroups(token));
        reset();
      })
      .catch((err) => {
        setIsSuccess(false);
        showAlert('error', err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <React.Fragment>
      <FeatureContainer>
        <HeaderWrapper>
          <HeaderText>Create new group's class</HeaderText>
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowDropDownCircleIcon sx={{ alignSelf: 'center' }} />
          </IconButton>
        </HeaderWrapper>
        <Collapse in={open}>
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
              {isSuccess ? 'Class added successfully' : error}
            </Alert>
          </Collapse>
          <FormContainer component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <GroupNameInput
              margin="normal"
              required
              fullWidth
              name="name"
              id="name"
              placeholder="Class"
              inputRef={nameRef}
              {...nameProps}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              disableElevation
            >
              Submit
            </SubmitButton>
          </FormContainer>
          <Collapse in={url}>
            <Typography mt={2} mb={1}>
              Invite share link
            </Typography>
            <LinkTextfield
              fullWidth
              id="outlined-adornment-password"
              InputLabelProps={{ shrink: false }}
              value={url || 'Submit the form to get your invitation link.'}
              disabled
              endAdornment={
                <InputAdornment position="end">
                  <Button onClick={() => navigator.clipboard.writeText(url)}>Copy</Button>
                </InputAdornment>
              }
            />
          </Collapse>
        </Collapse>
      </FeatureContainer>
    </React.Fragment>
  );
}
