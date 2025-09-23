// src/dashboard/SearchBar.jsx
import React, { useState } from "react";
import {
  TextField,
  Box,
  FormControlLabel,
  Switch,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../store/dashboardSlice";

export default function SearchBar({ onToggleTheme, isDarkMode }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    dispatch(setSearchTerm(query));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        marginBottom: "20px",
      }}
    >
      {/* Search Box + Button */}
      <Box sx={{ display: "flex", flexGrow: 1, gap: 1 }}>
        <TextField
          placeholder="Search widgets..."
          variant="outlined"
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            textTransform: "none",
            px: 3,
            borderRadius: "8px",
            backgroundColor: isDarkMode ? "#90caf9" : "#1976d2", // light blue in dark mode, normal blue in light mode
            "&:hover": {
              backgroundColor: isDarkMode ? "#64b5f6" : "#1565c0",
            },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Dark Mode Toggle */}
      <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            onChange={onToggleTheme}
            color="primary"
          />
        }
        label={isDarkMode ? "Dark Mode" : "Light Mode"}
      />
    </Box>
  );
}
