import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkgroups } from '../../../redux/actions/workgroups';
import { addGroup } from './AddGroup.service';
import { useTranslation } from 'react-i18next';
import {
  FeatureContainer,
  FormContainer,
  GroupNameInput,
  HeaderText,
  HeaderWrapper,
  LinkTextfield,
  SubmitButton
} from './AddGroup.styles';

export default function AddGroup({ openByDefault, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(openByDefault || false);
  const token = useSelector((state) => state.auth.user.token);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const { ref: nameRef, ...nameProps } = register('name', {
    required: t('addGroup.namerequired'),
    minLength: {
      value: 2,
      message: t('addGroup.nametooshort')
    },
    maxLength: {
      value: 64,
      message: t('addGroup.nametoolong')
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
    addGroup(data.name, token)
      .then((res) => {
        showAlert('success');
        setUrl('https://localhost:3000/invite/' + res.data.group.invitationToken);
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
    <Box>
      <FeatureContainer>
        <HeaderWrapper>
          <HeaderText>{t('addGroup.createnewgroup')}</HeaderText>
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
              {isSuccess ? t('addGroup.success') : error}
            </Alert>
          </Collapse>
          <FormContainer component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <GroupNameInput
              margin="normal"
              required
              fullWidth
              name="name"
              id="name"
              placeholder={t('addGroup.name')}
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
              {t('addGroup.submit')}
            </SubmitButton>
          </FormContainer>
          <Collapse in={url}>
            <Typography mt={2} mb={1}>
              {t('addGroup.submittogetlink')}
            </Typography>
            <LinkTextfield
              fullWidth
              id="outlined-adornment-password"
              InputLabelProps={{ shrink: false }}
              value={url || t('addGroup.submittogetlink')}
              disabled
              endAdornment={
                <InputAdornment position="end">
                  <Button onClick={() => navigator.clipboard.writeText(url)}>
                    {t('addGroup.copy')}
                  </Button>
                </InputAdornment>
              }
            />
          </Collapse>
        </Collapse>
      </FeatureContainer>
    </Box>
  );
}
