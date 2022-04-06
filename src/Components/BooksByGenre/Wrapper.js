import React from "react";
import { Grid, Box } from "@mui/material";

export default function Wrapper({ children }) {
  return (
    <Grid container>
      <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
      <Grid item lg={10} md={10} sm={12} xs={12}>
        <Box m={2}>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
