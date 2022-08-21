import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { SubmitButton, LoginBox, InputField } from "../styling";
import { toggleRegisterPrompt } from "../../actions/prompt";
import { login, register } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { CLEAR_MESSAGE } from "../../actions/types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const required = (value) => {
  if (!value) {
    return (
      <Typography sx={{ color: "white" }}>This field is required!</Typography>
    );
  }
};
const validEmail = (value) => {
  if (0) {
    return <Typography sx={{ color: "white" }}>Email is invalid.</Typography>;
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <Typography sx={{ color: "white" }}>
        Username should be 3-20 chars.
      </Typography>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 1 || value.length > 100) {
    return (
      <Typography sx={{ color: "white" }}>
        Password should be at least 1 digit.
      </Typography>
    );
  }
};
export const RegisterPrompt = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openRegisterPrompt } = useSelector((state) => state.prompt);
  const message = useSelector((state) => state.message.register_message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleClose = () => {
    dispatch(toggleRegisterPrompt(false));
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          return dispatch(login(username, password));
        })
        .then(() => {
          setUsername("");
          setPassword("");
          setEmail("");
          setLoading(false);
          dispatch(toggleRegisterPrompt(false));
          dispatch({ type: CLEAR_MESSAGE });
          navigate("/panel");
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  return (
    <Dialog
      open={openRegisterPrompt}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <LoginBox>
        {message}
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <Input
                  type="text"
                  placeholder="name"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  placeholder="e-mail"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                  sx={{ padding: 20 }}
                />
              </div>
              <div className="form-group">
                <Input
                  type="password"
                  placeholder="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <SubmitButton
                  fullWidth
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  Sign Up
                </SubmitButton>
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </LoginBox>
    </Dialog>
  );
};
