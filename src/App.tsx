import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./lib/theme";
import type { ThemeMode } from "./lib/theme";
import LandingPage from "./pages/Landing";
import GoogleCallback from "./pages/GoogleCallback";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import DashboardPage from "./pages/Dashboard";
import { ThemeContext } from "./lib/ThemeContext";
import { startAuthMiddleware, stopAuthMiddleware } from "./api/authMiddleWare";
import NotFound from "./pages/NotFound";

function App() {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    startAuthMiddleware();
    return () => stopAuthMiddleware();
  }, []);
  //
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/oauth/google" element={<GoogleCallback />} />
          <Route path="/auth/sign-in" element={<LoginPage />} />
          <Route path="/auth/sign-up" element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
