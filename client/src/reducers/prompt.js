const initialState = { openLoginPrompt: false, openRegisterCreator: false };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "TOGGLE_LOGIN_PROMPT":
      return {
        ...state,
        openLoginPrompt: payload,
      };
    case "TOGGLE_REGISTER_PROMPT":
      return {
        ...state,
        openRegisterPrompt: payload,
      };
    default:
      return state;
  }
}
