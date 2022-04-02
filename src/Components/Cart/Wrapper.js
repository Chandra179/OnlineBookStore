import React from "react";
import { Box, Grid } from "@mui/material";

export default function Wrapper({ children }) {
  return (
    <Grid item lg={8} md={8} sm={12} xs={12}>
      <Box
        sx={{
          marginRight: { xl: 4, lg: 4, md: 4, sm: 6, xs: 2 },
        }}
      >
        {children}
      </Box>
    </Grid>
  );
}
