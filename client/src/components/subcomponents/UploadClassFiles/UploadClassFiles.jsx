import { Collapse, IconButton } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClasses } from '../../../redux/actions/classes';
import { FeatureContainer, HeaderText, HeaderWrapper } from './UploadClassFiles.styles';
import { useState } from 'react';
import configData from '../../../config.json';
import { useTranslation } from 'react-i18next';

export const UploadClassFiles = ({ openByDefault, ...props }) => {
  const [open, setOpen] = useState(openByDefault || false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.user.token);
  const currentWorkgroup = useSelector((state) => state.workgroups.currentWorkgroup);
  const getUploadParams = ({ meta }) => {
    return {
      url: `${configData.SERVER_URL}api/v1/classes/${id}`,
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
    dispatch(getClasses(currentWorkgroup._id, token));
  };
  return (
    <FeatureContainer>
      <HeaderWrapper>
        <HeaderText>{t('uploadFiles.uploadfile')}</HeaderText>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ExpandLessRoundedIcon /> : <ArrowDropDownCircleIcon />}
        </IconButton>
      </HeaderWrapper>
      <Collapse in={open}>
        <Dropzone
          inputContent={t('uploadFiles.dropzonetext')}
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept="image/*,audio/*,video/*,.pdf"
        />
      </Collapse>
    </FeatureContainer>
  );
};
