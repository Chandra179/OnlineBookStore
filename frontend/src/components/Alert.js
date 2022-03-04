import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";


const AlertBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: 340,
  },
  [theme.breakpoints.up("sm")]: {
    minWidth: 460,
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 460,
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: 480,
  },
}))


/**
 * @param {str} props.severity
 * @param {str} props.name
 */

export default function BasicAlerts(props) {
  return (
    <AlertBox>
      <Stack sx={{ width: "100%" }} mb={2} spacing={2}>
        <Alert severity={props.severity}>{props.name}</Alert>
      </Stack>
    </AlertBox>
  );
}
