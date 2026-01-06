import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { palettes } from "./palette";

export type ThemeMode = "light" | "dark" | "violet";

export const getTheme = (mode: ThemeMode): Theme => {
  return createTheme({
    palette: palettes[mode] ?? palettes.dark,

    typography: {
      fontFamily: "Poppins, Arial, sans-serif",

      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      body1: { fontWeight: 400 },
      body2: { fontWeight: 400 },
      button: {
        fontWeight: 500,
        textTransform: "none",
      },
    },
  });
};
