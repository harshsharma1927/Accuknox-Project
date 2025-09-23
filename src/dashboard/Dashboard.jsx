// src/dashboard/Dashboard.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Category from "./Category";
import SearchBar from "./SearchBar";
import AddWidgetModal from "./AddWidgetModal";
import { renameCategory } from "../store/dashboardSlice";
import { Box } from "@mui/material";

// Accept theme props from App.jsx
export default function Dashboard({ onToggleTheme, isDarkMode }) {
  const categories = useSelector((state) => state.dashboard.categories || {});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
  const dispatch = useDispatch();

  const handleOpen = (categoryKey) => {
    setSelectedCategoryKey(categoryKey);
    setModalOpen(true);
  };

  const handleRename = (oldKey, newKey) => {
    dispatch(renameCategory({ oldKey, newKey }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Pass theme props to SearchBar */}
      <SearchBar onToggleTheme={onToggleTheme} isDarkMode={isDarkMode} />
      {Object.entries(categories).map(([categoryKey, widgets]) => (
        <Category
          key={categoryKey}
          title={categoryKey}
          categoryKey={categoryKey}
          widgets={widgets}
          onAddWidget={() => handleOpen(categoryKey)}
          onRenameCategory={handleRename}
        />
      ))}

      <AddWidgetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryKey={selectedCategoryKey}
      />
    </Box>
  );
}