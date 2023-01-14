import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { FeatureContainer, HeaderText, HeaderWrapper } from './ViewClassFiles.styles';
import { useState } from 'react';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from 'react-i18next';


export const ViewClassFiles = ({ id, files, openByDefault, name, ...props }) => {
  const AWS_URL = 'https://studentshare.s3.eu-west-2.amazonaws.com';
  const currentWorkgroup = useSelector((state) => state.workgroups.currentWorkgroup);
  const {t} = useTranslation();
  const [open, setOpen] = useState(openByDefault || false);
  return (
    <FeatureContainer>
      <HeaderWrapper>
        <HeaderText color="text.primary">{`${t('viewClassFiles.shared')} ${name?.toLowerCase() || t('viewClassFiles.files')}`}</HeaderText>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ExpandLessRoundedIcon /> : <ArrowDropDownCircleIcon/>}
        </IconButton>
      </HeaderWrapper>
      <Collapse in={open}>
        <List sx={{ 'max-height': '30vh', overflow: 'auto' }} dense>
          {files?.map((file) => (
            <ListItem
              secondaryAction={
                <IconButton edge="start" aria-label="download" sx={{ marginRight: 2 }}>
                  <DownloadIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={`${AWS_URL}/${file.file_key}`}>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography color="text.primary">{file.file_name}</Typography>}
                secondary={
                  <Typography color="text.secondary">
                    {Array.isArray(currentWorkgroup.members)
                      ? currentWorkgroup.members?.find((member) => member._id == file.userId).name
                      : 'unknown'}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </FeatureContainer>
  );
};
