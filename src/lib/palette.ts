import type { PaletteMode } from "@mui/material";

export const palettes = {
  /* =======================
     DARK THEME
  ======================= */
  dark: {
    mode: "dark" as PaletteMode,

    primary: {
      main: "#BEDBB0", // green primary
      contrastText: "#161616",
    },

    secondary: {
      main: "#9DC888", // hover / accent green
    },

    background: {
      default: "#232323", // main dark bg
      paper: "#1F1F1F", // cards / inputs
    },

    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255,255,255,0.5)",
    },

    divider: "rgba(255,255,255,0.3)",

    action: {
      active: "#BEDBB0",
      hover: "#9DC888",
      disabled: "rgba(255,255,255,0.3)",
    },

    icon: {
      primary: "#BEDBB0",
      secondary: "rgba(255,255,255,0.5)",
    },
  },

  /* =======================
     LIGHT THEME
  ======================= */
  light: {
    mode: "light",

    primary: {
      main: "#BEDBB0",
      contrastText: "#161616",
    },

    secondary: {
      main: "#9DC888",
    },

    background: {
      default: "#FDFDFD",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#161616",
      secondary: "rgba(22,22,22,0.5)",
    },

    divider: "rgba(22,22,22,0.3)",

    action: {
      active: "#BEDBB0",
      hover: "#9DC888",
      disabled: "rgba(22,22,22,0.3)",
    },

    icon: {
      primary: "#161616",
      secondary: "rgba(22,22,22,0.5)",
    },
  },

  /* =======================
     VIOLET THEME
  ======================= */
  violet: {
    mode: "dark",

    primary: {
      main: "#5255BC", // main violet
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#7B7EDE", // light violet
    },

    background: {
      default: "#D6D8FF", // violet bg section
      paper: "#ECEDFD", // cards
    },

    text: {
      primary: "#FFFFFF",
      secondary: "rgba(22,22,22,0.5)",
    },

    divider: "rgba(22,22,22,0.3)",

    action: {
      active: "#5255BC",
      hover: "#7B7EDE",
      disabled: "rgba(22,22,22,0.3)",
    },

    icon: {
      primary: "#5255BC",
      secondary: "#B8BCFD",
    },
  },
};
