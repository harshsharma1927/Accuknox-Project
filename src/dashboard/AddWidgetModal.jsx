// src/dashboard/AddWidgetModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addWidget } from "../store/dashboardSlice";

export default function AddWidgetModal({ open, onClose, categoryKey }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("pie");
  const [pairs, setPairs] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    if (!open) {
      // reset fields when closed
      setName("");
      setText("");
      setType("pie");
      setPairs([{ key: "", value: "" }]);
    }
  }, [open]);

  const handleAddPair = () => setPairs([...pairs, { key: "", value: "" }]);
  const handlePairChange = (idx, field, val) => {
    const next = [...pairs];
    next[idx][field] = val;
    setPairs(next);
  };

  const handleSave = () => {
    // build data object from pairs
    const data = {};
    pairs.forEach((p) => {
      const k = (p.key || "").toString().trim();
      const v = Number(p.value) || 0;
      if (k) data[k] = v;
    });

    const widget = {
      id: Date.now().toString(),
      name: name || "Untitled",
      text,
      type,
      data,
    };

    dispatch(addWidget({ categoryKey, widget }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Widget</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Widget Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Widget Text" value={text} onChange={(e) => setText(e.target.value)} fullWidth />
          <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="pie">Pie</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="text">Text</MenuItem>
          </TextField>

          <Stack spacing={1}>
            <div style={{ fontWeight: 600 }}>Data (key / value)</div>
            {pairs.map((p, i) => (
              <Stack direction="row" spacing={1} key={i}>
                <TextField placeholder="key" value={p.key} onChange={(e) => handlePairChange(i, "key", e.target.value)} fullWidth />
                <TextField placeholder="value" type="number" value={p.value} onChange={(e) => handlePairChange(i, "value", e.target.value)} sx={{ width: 120 }} />
              </Stack>
            ))}
            <Button onClick={handleAddPair}>+ Add Row</Button>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
