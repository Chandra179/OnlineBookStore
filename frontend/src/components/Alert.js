import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

/**
 * 
 * @param {str} props.severity
 * @param {str} props.name
 */

export default function BasicAlerts(props) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={props.severity}>{props.name}</Alert>
    </Stack>
  );
}
