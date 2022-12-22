const initialState = {
  mode: 'light',
  drawer: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SWITCH_THEME_MODE':
      return {
        ...state,
        mode: payload
      };
    case 'SWITCH_DRAWER':
      return {
        ...state,
        drawer: payload
      };
    default:
      return state;
  }
}
