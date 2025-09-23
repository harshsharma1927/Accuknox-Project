// src/dashboard/Widget.jsx
import React from "react";
import { CardContent, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { removeWidget } from "../store/dashboardSlice";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#8884d8"];

export default function Widget({ widget, categoryKey }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryKey, widgetId: widget.id }));
  };

  const renderChart = () => {
    if (!widget || !widget.data || Object.keys(widget.data).length === 0) {
      return (
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center",
            height: "200px", // Fixed height for consistency
            textAlign: "center"
          }}
        >
          <Box 
            component="img"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='none' stroke='%23cccccc' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 3v18h18'/%3E%3Cpath d='M18.7 8l-5.1 5.2-2.8-2.7L7 14.3'/%3E%3C/svg%3E"
            alt="No data"
            sx={{ mb: 1, opacity: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            No Graph data available!
          </Typography>
        </Box>
      );
    }

    const data = Object.entries(widget.data).map(([k, v]) => ({ name: k, value: v }));

    if (widget.type === "pie") {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie 
                data={data} 
                dataKey="value" 
                cx="50%" 
                cy="50%" 
                outerRadius={65} 
                label
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 1, px: 1 }}>
            {data.map((entry, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mr: 2, mb: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: COLORS[index % COLORS.length],
                    mr: 1,
                  }}
                />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: "0.75rem" }}>
                  {entry.name} ({entry.value})
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      );
    }

    if (widget.type === "bar") {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <XAxis dataKey="name" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 1, px: 1 }}>
            {data.map((entry, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mr: 2, mb: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: COLORS[index % COLORS.length],
                    mr: 1,
                  }}
                />
                <Typography variant="caption" color="text.primary" sx={{ fontSize: "0.75rem" }}>
                  {entry.name} ({entry.value})
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      );
    }

    // For text-only widgets or other types
    return (
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          height: "200px",
          textAlign: "center",
          px: 2
        }}
      >
        <Typography variant="body1" color="text.primary">
          {widget.text || "No content available"}
        </Typography>
      </Box>
    );
  };

  return (
    <div style={{ height: "100%", position: "relative", display: "flex", flexDirection: "column" }}>
      <IconButton
        size="small"
        sx={{ 
          position: "absolute", 
          top: 8, 
          right: 8, 
          zIndex: 1,
          backgroundColor: "rgba(255,255,255,0.1)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)"
          }
        }}
        onClick={handleRemove}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <CardContent sx={{ flex: 1, pt: 3, pb: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: "medium" }}>
          {widget.name}
        </Typography>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          {renderChart()}
        </Box>
      </CardContent>
    </div>
  );
}