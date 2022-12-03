import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Collapse,
  Divider,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkgroups } from "../../../../../redux/actions/workgroups";
import {
  FeatureContainer,
  GroupNameInput,
  HeaderText,
  HeaderWrapper,
  LinkTextfield,
  MainContainer,
  SubmitButton,
} from "./EditGroups.styles";
import { deleteGroup } from "./EditGroups.service";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const GroupList = ({ groups }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    deleteGroup(id, user.token).then(() => dispatch(getWorkgroups(user.token)));
  };

  const navigate = useNavigate();
  return (
    <List>
      {groups?.map((group) => (
        <ListItem sx={{ padding: 0, marginBottom: 2 }}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={group.name} />
          <ListItemIcon>
            <IconButton
              sx={{ marginRight: 0.1 }}
              edge="end"
              aria-label="delete"
              onClick={() => navigate(`/group-admin/${group._id}`)}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              sx={{ marginRight: 0.1 }}
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(group._id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
};

export default function EditGroups() {
  const groups = useSelector((state) => state.workgroups.data);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(true);
  const token = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();

  const showErrorAlert = (error) => {
    setError(error);
    setTimeout(() => setError(""), 5000);
  };

  return (
    <React.Fragment>
      <FeatureContainer>
        <HeaderWrapper>
          <HeaderText>Groups I'm in</HeaderText>
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowDropDownCircleIcon sx={{ alignSelf: "center" }} />
          </IconButton>
        </HeaderWrapper>
        <Collapse in={open}>
          <GroupList groups={groups} />
        </Collapse>
      </FeatureContainer>
    </React.Fragment>
  );
}
