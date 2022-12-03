const initialState = {
  mode: "light",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SWITCH_THEME_MODE":
      return {
        ...state,
        mode: payload,
      };
    default:
      return state;
  }
}
