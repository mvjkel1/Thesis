import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";

export const LoginBox = styled(Box)({
  "& ": {
    borderColor: "black",
    backgroundColor: "#2F2F2F",
    borderWidth: 2,
    borderRadius: "10%",
    padding: 25,
    marginTop: 0,
    marginBottom: 16,
    borderWidth: "10px",
    textAlign: "center",
  },
});

export const ValidationTextField = styled(TextField)({
  "&": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& input": {
    color: "white",
  },
  "& input:valid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:hover + fieldset": {
    borderColor: "white",
    borderRightWidth: 25,
    padding: "4px!important",
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:focus + fieldset": {
    borderColor: "white",
    borderRightWidth: 25,
    paddingLeft: "4px",
    borderRadius: 20,
    color: "white",
  },
  "& input:invalid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
});

export const InputField = styled(Input)({
  "&": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& fieldset": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& input": {
    color: "white",
    borderRadius: 20,
    borderColor: "white",
  },
  "& input:valid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:hover + fieldset": {
    borderColor: "white",
    borderRightWidth: 15,
    padding: "8px!important",
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:focus + fieldset": {
    borderColor: "white",
    borderRightWidth: 15,
    paddingLeft: "5px",
    borderRadius: 20,
    color: "white",
  },
  "& input:invalid + fieldset": {
    borderColor: "white!important",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
});

export const ValidationTextFieldMultiline = styled(TextField)({
  "&": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& fieldset": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& input": {
    color: "white",
    borderRadius: 20,
    borderColor: "white",
  },
  "& input:valid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:hover + fieldset": {
    borderColor: "white",
    borderRightWidth: 15,
    padding: "8px!important",
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:focus + fieldset": {
    borderColor: "white",
    borderRightWidth: 15,
    paddingLeft: "5px",
    borderRadius: 20,
    color: "white",
  },
  "& input:invalid + fieldset": {
    borderColor: "white!important",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
});

export const SubmitButton = styled(Button)({
  "& ": {
    borderColor: "white",
    backgroundColor: "white",
    height: "50px",
    borderRadius: 20,
    textAlign: "left",
    marginTop: 3,
  },
});

export const StyledBox = styled(Box, {
  name: "StyledBox",
  slot: "Wrapper",
})({
  border: "solid",
  borderColor: "#2F2F2F",
  backgroundColor: "#2F2F2F",
  borderRadius: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  alignItems: "center",
  padding: "20px 20px 20px 20px",
  height: "5vh",
  marginBottom: 20,
});
