import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWorkgroups } from "../../../../../redux/actions/workgroups";
import { updateGroupName } from "./EditGroupData.service";
import { Alert, Collapse, FormHelperText, IconButton } from "@mui/material";
import {
  FeatureContainer,
  FormContainer,
  GroupNameInput,
  HeaderText,
  HeaderWrapper,
  SubmitButton,
} from "./EditGroupData.styles";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

export const EditGroupData = (props) => {
  const { id } = useParams();
  const [open, setOpen] = useState(props.openByDefault ? true : false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [error, setError] = useState();
  const user = useSelector((state) => state.auth.user);
  const group = useSelector((state) => state.workgroups.data)?.find(
    (group) => group._id == id
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const setInitialFormValues = () => {
    let values = {};
    values.name = group?.name;
    reset({
      ...values,
     name: values.name
    });
  };

  const { ref: nameRef, ...nameProps } = register("name", {
    required: "Name is required!",
    minLength: {
      value: 2,
      message: "Name is too short",
    },
    maxLength: {
      value: 64,
      message: "Name is too long",
    },
  });

  const onSubmit = (data) => {
    setError("");
    setIsSuccess(false);
    setIsLoading(true);
    updateGroupName(id, data.name, user.token)
      .then(() => {
        setIsSuccess(true);
        dispatch(getWorkgroups(user.token));
        reset();
      })
      .catch((err) => {
        setIsSuccess(false);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setInitialFormValues();
    console.log("user has changed!");
  }, [user, group])

  return (
    <FeatureContainer>
      <HeaderWrapper>
        <HeaderText>Edit group data</HeaderText>
        <IconButton onClick={() => setOpen(!open)}>
          {<ArrowDropDownCircleIcon sx={{ alignSelf: "center" }} />}
        </IconButton>
      </HeaderWrapper>
      <Collapse in={open}>
        <Collapse in={isSuccess || error}>
          <Alert
            severity={error ? "error" : "success"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  error ? setError(false) : setIsSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {isSuccess ? "Changed group name successfully" : error}
          </Alert>
        </Collapse>
        <FormContainer
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <GroupNameInput
            margin="normal"
            required
            fullWidth
            name="name"
            id="name"
            placeholder="Group name"
            inputRef={nameRef}
            {...nameProps}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            disableElevation
          >
            Submit
          </SubmitButton>
        </FormContainer>
        <FormHelperText error>{errors?.name?.message}</FormHelperText>
      </Collapse>
    </FeatureContainer>
  );
};
