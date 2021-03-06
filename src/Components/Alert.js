import * as React from "react";
import Alert from "@mui/material/Alert";
import { Box, Typography } from "@mui/material";

function CustomAlert({ severity, name }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Alert severity={severity}>
        <Typography>{name}</Typography>
      </Alert>
    </Box>
  );
}

export default CustomAlert;
