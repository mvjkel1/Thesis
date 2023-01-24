import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, Grid, IconButton, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkgroups } from '../../../redux/actions/workgroups';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { addEvent } from './AddEvent.service';
import {
  FeatureContainer,
  FormContainer,
  EventNameInput,
  HeaderText,
  HeaderWrapper,
  SubmitButton,
  EventDescriptionInput
} from './AddEvent.styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset
  } = useForm();

  const { ref: nameRef, ...nameProps } = register('name', {
    required: t('addEvent.namerequired'),
    minLength: {
      value: 2,
      message: t('addEvent.nametooshort')
    },
    maxLength: {
      value: 64,
      message: t('addEvent.nametoolong')
    }
  });

  const { ref: startDateRef, ...startDateProps } = register('startDate', {
    required: t('addEvent.timerequired')
  });

  const { ref: endDateRef, ...endDateProps } = register('endDate', {
    required: t('addEvent.timerequired'),
    validate: (val) => {
      if (moment(val).diff(moment(watch('startDate')), 'seconds') < 0) {
        return t('addEvent.endbeforestart');
      }
      if (moment(val).diff(moment(watch('startDate')), 'days') > 0) {
        return t('addEvent.sameday');
      }
    }
  });

  const { ref: descriptionRef, ...descriptionProps } = register('description', {
    required: t('addEvent.descriptionrequired'),
    minLength: {
      value: 2,
      message: t('addEvent.descriptiontooshort')
    },
    maxLength: {
      value: 64,
      message: t('addEvent.descriptiontoolong')
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
      data.description,
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
          <HeaderText>{t('addEvent.addevent')}</HeaderText>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ExpandLessRoundedIcon /> : <ArrowDropDownCircleIcon />}
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
              {isSuccess ? t('addEvent.success') : error}
            </Alert>
          </Collapse>
          <FormContainer component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={1} rows={12}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <EventNameInput
                  sx={{ flex: 2 }}
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  id="name"
                  placeholder={t('addEvent.name')}
                  inputRef={nameRef}
                  {...nameProps}
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Controller
                    control={control}
                    defaultValue={moment()}
                    name="startDate"
                    render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                      <DateTimePicker
                        {...field}
                        inputRef={startDateRef}
                        label={t('addEvent.date-from')}
                        renderInput={(inputProps) => (
                          <TextField
                            {...inputProps}
                            onBlur={onBlur}
                            fullWidth
                            name={name}
                            error={!!errors.startDate}
                            helperText={errors.startDate?.message}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Controller
                    control={control}
                    defaultValue={moment().add(1, 'hour')}
                    name="endDate"
                    render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                      <DateTimePicker
                        {...field}
                        inputRef={endDateRef}
                        label={t('addEvent.date-to')}
                        renderInput={(inputProps) => (
                          <TextField
                            {...inputProps}
                            onBlur={onBlur}
                            fullWidth
                            name={name}
                            error={!!fieldState.error}
                            helperText={errors.endDate?.message}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <EventDescriptionInput
                  margin="normal"
                  required
                  multiline
                  rows={3}
                  fullWidth
                  name="description"
                  id="description"
                  placeholder={t('addEvent.description')}
                  inputRef={descriptionRef}
                  {...descriptionProps}
                  error={!!errors.description}
                  helperText={errors?.description?.message}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <SubmitButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  disableElevation
                >
                  {t('addEvent.submit')}
                </SubmitButton>
              </Grid>
            </Grid>
          </FormContainer>
        </Collapse>
      </FeatureContainer>
    </React.Fragment>
  );
}
