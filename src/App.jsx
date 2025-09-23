// src/App.jsx
import React, { useState, useMemo } from "react";
import Dashboard from "./dashboard/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
        // You can add more theme customizations here
      }),
    [isDarkMode]
  );

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard onToggleTheme={handleToggleTheme} isDarkMode={isDarkMode} />
    </ThemeProvider>
  );
}