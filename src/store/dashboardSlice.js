// src/store/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";
import widgetsData from "../assets/widgets.json"; // initial JSON

// load/save to localStorage so user changes persist across refresh
const loadState = () => {
  try {
    const raw = localStorage.getItem("dashboardState");
    if (!raw) return { categories: widgetsData, searchTerm: "" };
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to load dashboard state:", e);
    return { categories: widgetsData, searchTerm: "" };
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("dashboardState", JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to save dashboard state:", e);
  }
};

const initialState = loadState();

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryKey, widget } = action.payload;
      if (!state.categories[categoryKey]) {
        // if category doesn't exist, create it
        state.categories[categoryKey] = [];
      }
      state.categories[categoryKey].push(widget);
      saveState(state);
    },

    removeWidget: (state, action) => {
      const { categoryKey, widgetId } = action.payload;

      if (categoryKey && state.categories[categoryKey]) {
        // normal case: we have the category key
        state.categories[categoryKey] = state.categories[categoryKey].filter(
          (w) => w.id !== widgetId
        );
      } else {
        // fallback: remove the widget from any category that contains it
        Object.keys(state.categories).forEach((k) => {
          state.categories[k] = state.categories[k].filter((w) => w.id !== widgetId);
        });
      }

      saveState(state);
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      saveState(state);
    },

    renameCategory: (state, action) => {
      const { oldKey, newKey } = action.payload;
      if (!oldKey || !newKey || oldKey === newKey) return;
      if (!state.categories[oldKey]) return;
      // If newKey exists, merge by appending
      if (state.categories[newKey]) {
        state.categories[newKey] = [...state.categories[newKey], ...state.categories[oldKey]];
      } else {
        state.categories[newKey] = state.categories[oldKey];
      }
      delete state.categories[oldKey];
      saveState(state);
    },
  },
});

export const { addWidget, removeWidget, setSearchTerm, renameCategory } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
