import axios from "axios";
const API_URL = "http://localhost:3001/api/v1/groups";

export const updateGroupName = (groupId, name, token) => {
  return axios
    .patch(
      `${API_URL}/${groupId}`,
      {
        name: name,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(
      (response) => {
        return Promise.resolve(response.data.data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
};
