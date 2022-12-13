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
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DownloadIcon from '@mui/icons-material/Download';

export const ViewClassFiles = ({ id, files, openByDefault, ...props }) => {
  const AWS_URL = 'https://studentshare.s3.eu-west-2.amazonaws.com';
  const [open, setOpen] = useState(openByDefault || false);
  return (
    <FeatureContainer>
      <HeaderWrapper>
        <HeaderText color="text.primary">Shared files</HeaderText>
        <IconButton onClick={() => setOpen(!open)}>
          {<ArrowDropDownCircleIcon sx={{ alignSelf: 'center' }} />}
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
                secondary={<Typography color="text.secondary">Username</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </FeatureContainer>
  );
};
