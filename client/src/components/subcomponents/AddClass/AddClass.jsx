import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Collapse, IconButton, InputAdornment, Typography } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getWorkgroups } from '../../../redux/actions/workgroups';
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

export default function AddClass({ openByDefault, ...props }) {
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
    reset
  } = useForm();

  const { ref: nameRef, ...nameProps } = register('name', {
    required: t('addClass.namerequired'),
    minLength: {
      value: 2,
      message: t('addClass.nametooshort')
    },
    maxLength: {
      value: 64,
      message: t('addClass.nametoolong')
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
          <HeaderText>{t('addClass.createnewclass')}</HeaderText>
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
              {isSuccess ? t('addClass.success') : error}
            </Alert>
          </Collapse>
          <FormContainer component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <GroupNameInput
              margin="normal"
              required
              fullWidth
              name="name"
              id="name"
              placeholder={t('addClass.name')}
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
              {t('addClass.submit')}
            </SubmitButton>
          </FormContainer>
        </Collapse>
      </FeatureContainer>
    </React.Fragment>
  );
}
