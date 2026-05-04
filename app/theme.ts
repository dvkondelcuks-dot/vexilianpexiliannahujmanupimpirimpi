import { createTheme } from "@mui/material/styles";

export const vexTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#07090B",
      paper: "#101419"
    },
    text: {
      primary: "#F4F7FA",
      secondary: "#A7B0BA"
    },
    primary: {
      main: "#B6FF3B"
    },
    warning: {
      main: "#E6A84A"
    },
    success: {
      main: "#8FD18A"
    },
    error: {
      main: "#D96C5F"
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Inter, Arial, sans-serif",
    h1: {
      fontSize: "4.5rem",
      lineHeight: 0.95,
      letterSpacing: 0,
      fontWeight: 560
    },
    h2: {
      fontSize: "3rem",
      lineHeight: 1.05,
      letterSpacing: 0,
      fontWeight: 560
    },
    h3: {
      fontSize: "1.5rem",
      lineHeight: 1.2,
      letterSpacing: 0,
      fontWeight: 560
    },
    body1: {
      fontSize: "1.0625rem",
      lineHeight: 1.65
    },
    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.6
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 0
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          minHeight: 42
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    }
  }
});