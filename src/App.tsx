import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useMemo } from "react";
import Playground from "./pages/Playgrounds";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./lib/theme";
import type { ThemeMode } from "./lib/theme";
import LandingPage from "./pages/Landing";
import GoogleCallback from "./pages/GoogleCallback";

function App() {
  const user = {
    theme: "dark",
  };

  const theme = useMemo(
    () => getTheme((user?.theme as ThemeMode) || "dark"),
    [user?.theme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/oauth/google" element={<GoogleCallback />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
