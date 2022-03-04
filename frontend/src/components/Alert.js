import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

/**
 * @param {str} props.severity
 * @param {str} props.name
 */

export default function BasicAlerts(props) {
  return (
    <Box
      sx={{
        width: 340,
        minWidth: { lg: 480, md: 460, sm: 460 },
      }}
    >
      <Stack sx={{ width: "100%" }} mb={2} spacing={2}>
        <Alert severity={props.severity}>{props.name}</Alert>
      </Stack>
    </Box>
  );
}
