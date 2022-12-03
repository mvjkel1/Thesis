import { useToken } from "../../commons/useToken";
import { DataService } from "../services/classes.service";
import store from "../store";

export const getClasses = (groupId, token) => (dispatch) => {
  return DataService.getClasses(groupId, token).then(
    (data) => {
      dispatch({
        type: "GET_CLASSES_SUCCESS",
        payload: data,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: "GET_CLASSES_FAIL",
        payload: message,
      });
      return Promise.reject();
    }
  )
};

export const switchWorkgroup = (id) => (dispatch, getState) => {
  const selectedGroup = getState().workgroups.data.find(
    (group) => group._id == id
  );
  dispatch({
    type: "SWITCH_WORKGROUP",
    payload: selectedGroup,
  });
};
