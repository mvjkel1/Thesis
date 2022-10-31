import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { authHeader } from "../../services/auth-header";
import { UserList } from "./UserList";
import LinearProgress from "@mui/material/LinearProgress";
import { StyledBox } from "../styling";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch } from "react-redux";

export const Panel = () => {
  const headers = authHeader();
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = React.useState();
  const [checked, setChecked] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sendRequest = (action, targets, extraParams = {}) => {
    const params = new URLSearchParams(targets.map((s) => ["id", s]));
    Object.entries(extraParams).forEach(([key, value]) =>
      params.append(key, value)
    );
    return fetch(
      `http://localhost:3001/api/get/${action}?${params.toString()}`,
      { headers }
    ).then((res) => {
      if (!res.ok)
        return res.json().then((text) => {
          throw new Error(text.message);
        });
      return res.json();
    });
  };
  const loadUsers = () => {
    setIsLoading(true);
    sendRequest("userList", [], authHeader)
      .then((response) => setFetchedUsers(response))
      .catch((error) => {
        setError(error.message);
        setFetchedUsers([]);
        setTimeout(() => {
          navigate("/");
          dispatch(logout());
        }, 1500);
      })
      .finally(() => setIsLoading(false));
  };
  const alternateUser = (action, extraParams) => {
    sendRequest(action, checked, extraParams)
      .then((res) => loadUsers())
      .catch((error) => setError(error.message));
  };
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
          <StyledBox>
            <Button
              variant="contained"
              sx={{ margin: 1 }}
              disabled={!checked.length > 0}
              endIcon={<SendIcon />}
              onClick={() => alternateUser("changeUserStatus", { active: 0 })}
            >
              Block
            </Button>
            <Button
              variant="contained"
              sx={{ margin: 1 }}
              disabled={!checked.length > 0}
              endIcon={<SendIcon />}
              onClick={() => alternateUser("changeUserStatus", { active: 1 })}
            >
              Unblock
            </Button>
            <Button
              variant="contained"
              sx={{ margin: 1 }}
              disabled={!checked.length > 0}
              endIcon={<SendIcon />}
              onClick={() => alternateUser("deleteUser", { active: 1 })}
            >
              Delete
            </Button>
            {error && (
              <Typography sx={{ color: "white" }}>
                <b>Error:</b> {error} Redirecting to home page.
              </Typography>
            )}
          </StyledBox>
        </Grid>
        <Grid item xs={12} align="center">
          <StyledBox sx={{ height: "80vh !important" }}>
            {isLoading && <LinearProgress />}
            <UserList
              users={fetchedUsers}
              setChecked={setChecked}
              checked={checked}
            />
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};
