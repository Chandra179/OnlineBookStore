import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

function BasicAlerts({ severity, name }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Alert severity={severity}>{name}</Alert>
    </Box>
  );
}

export default BasicAlerts;
