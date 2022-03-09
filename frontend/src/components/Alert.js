import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

/**
 * MUI Alert
 * @param {String} props.severity
 * @param {String} props.name
 */
function BasicAlerts(props) {
  return (
    <Box>
      <Stack sx={{ width: "100%" }}>
        <Alert severity={props.severity}>{props.name}</Alert>
      </Stack>
    </Box>
  );
}

export default BasicAlerts;
