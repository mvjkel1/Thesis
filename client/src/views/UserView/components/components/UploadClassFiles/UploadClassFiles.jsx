import { Collapse, IconButton } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClasses } from '../../../../../redux/actions/classes';
import { FeatureContainer, HeaderText, HeaderWrapper } from './UploadClassFiles.styles';
import { useState } from 'react';

export const UploadClassFiles = ({openByDefault, ...props}) => {
  const [open, setOpen] = useState(openByDefault || false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
  const getUploadParams = ({ meta }) => {
    return {
      url: `http://localhost:3001/api/v1/classes/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    };
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };
  const handleSubmit = (files, allFiles) => {
    // send chat notification about user successfully adding files... (tbd)
    // Remove them from dropzone
    allFiles.map((f) => f.remove());
    // Dispatch action to refetch class data (to show new files)
    dispatch(getClasses(id, token));
  };
  return (
    <FeatureContainer>
        <HeaderWrapper>
            <HeaderText>Upload new file</HeaderText>
            <IconButton onClick={() => setOpen(!open)}>
            <ArrowDropDownCircleIcon sx={{ alignSelf: 'center' }} />
            </IconButton>
        </HeaderWrapper>
        <Collapse in={open}>
            <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="image/*,audio/*,video/*,.pdf"
            />
        </Collapse>
    </FeatureContainer>
  );
};
