import React from "react";
import { Grid, Box, Typography } from "@mui/material";

export default function BookTitle({ title }) {
  return (
    <Grid item lg={9} md={9} sm={9} xs={12} mb={0.4}>
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            letterSpacing: 1.3,
            fontSize: {
              lg: 15,
              md: 15,
              sm: 15,
              xs: 12,
            },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Grid>
  );
}
