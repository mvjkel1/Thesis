import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkgroups } from '../../../../../redux/actions/workgroups';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { addEvent } from './AddEvent.service';
import {
  FeatureContainer,
  FormContainer,
  EventNameInput,
  HeaderText,
  HeaderWrapper,
  LinkTextfield,
  SubmitButton,
  EventDescriptionInput
} from './AddEvent.styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import moment from 'moment';
import 'moment-timezone';

export default function AddEvent({ openByDefault, classId, groupId, ...props }) {
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
    control,
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

  const { ref: startDateRef, ...startDateProps } = register('startDate', {
    required: 'Time is required!'
  });

  const { ref: endDateRef, ...endDateProps } = register('endDate', {
    required: 'Time is required!',
    validate: (val) => {
      if (moment(val).diff(moment(watch('startDate')), 'seconds') < 0) {
        return 'End date is before start date.';
      }
      if (moment(val).diff(moment(watch('startDate')), 'days') > 0) {
        return 'Event should end the same day.';
      }
    }
  });

  const { ref: descriptionRef, ...descriptionProps } = register('description', {
    required: 'Description is required!',
    minLength: {
      value: 2,
      message: 'Description is too short'
    },
    maxLength: {
      value: 64,
      message: 'Description is too long'
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
    addEvent(
      data.name,
      moment(data.startDate).format('x'),
      moment(data.endDate).format('x'),
      groupId,
      classId,
      token
    )
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
          <HeaderText>Add event</HeaderText>
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
              {isSuccess ? 'Event added successfully' : error}
            </Alert>
          </Collapse>
          <FormContainer component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <EventNameInput
                sx={{ flex: 2 }}
                margin="normal"
                required
                fullWidth
                name="name"
                id="name"
                placeholder="Event name"
                inputRef={nameRef}
                {...nameProps}
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Controller
                  control={control}
                  defaultValue={moment()}
                  name="startDate"
                  render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                    <DateTimePicker
                      {...field}
                      inputRef={startDateRef}
                      label="Date"
                      renderInput={(inputProps) => (
                        <TextField
                          {...inputProps}
                          onBlur={onBlur}
                          name={name}
                          error={!!errors.startDate}
                          helperText={errors.startDate?.message}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Controller
                  control={control}
                  defaultValue={moment().add(1, 'days')}
                  name="endDate"
                  render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                    <DateTimePicker
                      {...field}
                      inputRef={endDateRef}
                      label="Date"
                      renderInput={(inputProps) => (
                        <TextField
                          {...inputProps}
                          onBlur={onBlur}
                          name={name}
                          error={!!fieldState.error}
                          helperText={errors.endDate?.message}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <EventDescriptionInput
              margin="normal"
              required
              multiline
              rows={3}
              fullWidth
              name="name"
              id="name"
              placeholder="Description"
              inputRef={descriptionRef}
              {...descriptionProps}
              error={!!errors.description}
              helperText={errors?.description?.message}
            />
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              disableElevation
              sx={{ alignSelf: 'end' }}
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
