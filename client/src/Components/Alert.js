import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

function BasicAlerts({ severity, name }) {
  return (
    <Box>
      <Stack sx={{ width: "100%" }}>
        <Alert severity={severity}>{name}</Alert>
      </Stack>
    </Box>
  );
}

export default BasicAlerts;
