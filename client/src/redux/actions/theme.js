export const switchMode = (payload) => {
  return {
    type: 'SWITCH_THEME_MODE',
    payload
  };
};

export const switchDrawer = (payload) => {
  return {
    type: 'SWITCH_DRAWER',
    payload
  };
};
