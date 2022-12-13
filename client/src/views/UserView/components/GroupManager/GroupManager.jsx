import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  Divider,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToken } from '../../../../commons/useToken';
import { getWorkgroups } from '../../../../redux/actions/workgroups';
import {
  FeatureContainer,
  GroupNameInput,
  HeaderText,
  LinkTextfield,
  MainContainer,
  SubmitButton
} from './GroupManager.styles';
import Visibility from '@mui/icons-material/Visibility';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import AddGroup from '../components/AddGroup/AddGroup';
import EditGroups from '../components/EditGroups/EditGroups';

export default function GroupManager() {
  return (
    <React.Fragment>
      <MainContainer>
        <AddGroup openByDefault />
        <EditGroups openByDefault/>
      </MainContainer>
    </React.Fragment>
  );
}
