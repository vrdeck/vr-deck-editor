import { createMuiTheme } from "@material-ui/core";

const teal = "#4ecdc4";
const black = "#292f36";
const white = "#f7fff7";
const red = "#ff6b6b";
const yellow = "#ffe66d";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: yellow,
      main: yellow,
      dark: yellow,
      contrastText: black,
    },
    secondary: {
      light: red,
      main: red,
      dark: red,
      contrastText: white,
    },
    background: {
      default: white,
    },
    error: {
      light: red,
      main: red,
      dark: red,
      contrastText: white,
    },
    success: {
      light: teal,
      main: teal,
      dark: teal,
      contrastText: white,
    },
    warning: {
      light: yellow,
      main: yellow,
      dark: yellow,
      contrastText: black,
    },
    action: {
      active: teal,
    },
  },
});
