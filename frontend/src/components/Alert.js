import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

/*
  [COMPONENTS: ALERT]
  :type: severity <bool>
  :type: name <string>
  :rtype: MUI<Alert>
*/

export default function BasicAlerts(props) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={props.severity}>{props.name}</Alert>
    </Stack>
  );
}
