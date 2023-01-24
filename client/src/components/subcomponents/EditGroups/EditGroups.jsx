import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LinkIcon from '@mui/icons-material/Link';
import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWorkgroups } from '../../../redux/actions/workgroups';
import { deleteGroup, leaveGroup } from './EditGroups.service';
import { useTranslation } from 'react-i18next';
import { FeatureContainer, HeaderText, HeaderWrapper } from './EditGroups.styles';

const GroupList = ({ groups, ...state }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const groupData = groups;

  const handleDelete = (id) => {
    deleteGroup(id, user.token).then(() => dispatch(getWorkgroups(user.token)));
  };

  const handleLeave = (id) => {
    leaveGroup(id, user.token).then(() => dispatch(getWorkgroups(user.token)));
  };

  const navigate = useNavigate();
  return (
    <List>
      {Array.isArray(groupData) &&
        groupData.map((group) => (
          <ListItem sx={{ padding: 0, marginBottom: 2 }}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={group.name} />
            <ListItemIcon>
              {group?.founder?._id == user._id && (
                <IconButton
                  sx={{ marginRight: 0.1 }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => navigate(`/group-admin/${group._id}`)}
                >
                  <SettingsIcon />
                </IconButton>
              )}
                <IconButton
                  sx={{ marginRight: 0.1 }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => navigator.clipboard.writeText(`studentshare.pl/invite/${group.invitationToken}`)}
                >
                  <LinkIcon />
                </IconButton>
              {group?.founder?._id == user._id && (
                <IconButton
                  sx={{ marginRight: 0.1 }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(group._id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {group?.founder?._id !== user._id && (
                <IconButton
                  sx={{ marginRight: 0.1 }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleLeave(group._id)}
                >
                  <ExitToAppIcon />
                </IconButton>
              )}
            </ListItemIcon>
          </ListItem>
        ))}
    </List>
  );
};

export default function EditGroups({ openByDefault, ...props }) {
  const groups = useSelector((state) => state.workgroups?.data);
  const [open, setOpen] = useState(openByDefault || false);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <FeatureContainer>
        <HeaderWrapper>
          <HeaderText>{t('groupsimin')}</HeaderText>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ExpandLessRoundedIcon /> : <ArrowDropDownCircleIcon />}
          </IconButton>
        </HeaderWrapper>
        <Collapse in={open}>
          <GroupList groups={groups} />
        </Collapse>
      </FeatureContainer>
    </React.Fragment>
  );
}
