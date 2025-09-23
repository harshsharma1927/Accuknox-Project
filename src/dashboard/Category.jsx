// src/dashboard/Category.jsx
import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import Widget from "./Widget";

export default function Category({ title, categoryKey, widgets = [], onAddWidget, onRenameCategory }) {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(title);

  const handleNameToggle = () => {
    if (isEditing && categoryName.trim() !== "") {
      onRenameCategory && onRenameCategory(title, categoryName.trim());
    }
    setIsEditing(!isEditing);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        {isEditing ? (
          <TextField
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            size="small"
            variant="outlined"
            autoFocus
            sx={{ mr: 2 }}
          />
        ) : (
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {categoryName}
          </Typography>
        )}

<Button
  variant={isEditing ? "contained" : "outlined"}
  color={isEditing ? "success" : "primary"}
  onClick={handleNameToggle}
  sx={{
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    px: 2.5,
    py: 0.8,
    boxShadow: isEditing ? 2 : 0,
    "&:hover": {
      backgroundColor: isEditing ? "success.dark" : "primary.light",
    },
  }}
>
  {isEditing ? "Save" : "Edit"}
</Button>

      </div>

      <Grid container spacing={2}>
        {widgets.map((widget) => (
          <Grid item xs={12} sm={6} lg={4} key={widget.id}>
            <Card
              sx={{
                width: "100%",
                height: "350px", // Fixed height for consistency
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Widget widget={widget} categoryKey={categoryKey} />
            </Card>
          </Grid>
        ))}

        {/* Add Widget Card */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            onClick={onAddWidget}
            sx={{
              width: "100%",
              height: "350px", // Same fixed height
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed",
              borderColor: "divider",
              backgroundColor: "transparent",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "rgba(255,255,255,0.04)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{ textTransform: "none", px: 4, py: 1.8, borderRadius: "12px" }}
              >
                + Add Widget
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}