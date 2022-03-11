import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingProgress() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Loading...</Typography>
        <CircularProgress sx={{ fontSize: 80 }} />
      </Box>
    </div>
  );
}
