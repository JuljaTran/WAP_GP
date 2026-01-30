import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    primary: { main: "#669FFD" },
    secondary: { main: "#80B0FF" },
    background: {
      default: "#F7FAFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#032051",
      secondary: "#555555",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',

    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },

    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.9rem",
      color: "#555",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          paddingLeft: 24,
          paddingRight: 24,
          fontWeight: 600,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
