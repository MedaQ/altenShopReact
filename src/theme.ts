import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Adjust based on your color scheme
    },
    background: {
      default: "#f4f4f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    }
  },
  typography: {
    fontSize: 14,
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body {
          margin: 0;
          background-color: var(--primary-bg-color);
          color: var(--primary-font-color);
          height: 100%;
        }
        .flag {
          width: 20px !important;
          display: inline-block;
          height: 14px !important;
          color: transparent;
        }
        .transparent .navbar {
          display: none;
        }
        .unavailable {
          color: var(--disabled-text);
          pointer-events: none;
          opacity: 0.6;
        }
      `,
    },
  },
});

export default Theme;
