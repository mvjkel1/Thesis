import { createTheme } from '@mui/material';

const vividBlue = '#8361e8';
const lightGray = '#c9c9c9';
const white = '#ffffff';
const black = '#000000';

export const lightPalette = {
  mode: 'light',
  palette: {
    primary: {
      main: '#8361e8',
      dark: 'rgba(91,67,162,0.82)'
    },
    secondary: {
      main: '#000000',
      contrastText: 'rgba(249,249,249,0.87)'
    },
    neutral: {
      light: 'white', // white menu items etc (in white mode udistinguishable)
      main: '#f6f6f6', // slightly gray menu items etc /////////////////////////////////////was #f6f6f6
      dark: 'rgba(234,234,234,255)' // menuitems doublehover
    },
    background: {
      light: 'white',
      main: '#f2f6fe', // white bg
      dark: 'rgba(244,246,248,255)' //neutral off-white bg
    },
    text: {
      secondary: '#516272',
      primary: '#000000'
    },
    border: {
      light: 'rgba(224, 224, 224, 1)',
      main: '#c0c0c0'
    },
    icon: {
      main: '#516272'
    }
  }
};

export const darkPalette = {
  mode: 'dark',
  palette: {
    primary: {
      main: '#8361e8',
      dark: 'rgba(91,67,162,0.82)'
    },
    secondary: {
      main: '#000000',
      contrastText: 'rgba(249,249,249,0.87)'
    },
    neutral: {
      light: '#222222', // white menu items etc
      main: '#323232', // slightly gray menu items etc
      dark: 'rgba(234,234,234,255)' // menuitems doublehover
    },
    background: {
      light: '#222222',
      main: 'black', // white bg
      dark: 'rgba(244,246,248,255)' //neutral off-white bg
    },
    text: {
      secondary: '#7d7d7d',
      primary: '#ffffff'
    },
    border: {
      light: '#7d7d7d',
      main: '#7d7d7d'
    },
    icon: {
      main: '#ffffff'
    }
  }
};

export const getDesignTokens = (mode) => {
  if (mode == 'light') return lightPalette;
  return darkPalette;
};
