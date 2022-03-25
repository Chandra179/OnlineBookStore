import React from "react";
import { Grid, Box, Typography } from "@mui/material";

export default function BookTotalPrice({ price }) {
  return (
    <Grid item lg={3} md={3} sm={3} xs={12}>
      <Box
        sx={{
          justifyContent: {
            lg: "flex-end",
            md: "flex-end",
            sm: "flex-end",
            xs: "flex-start",
          },
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              lg: 16,
              md: 16,
              sm: 16,
              xs: 13,
            },
            fontWeight: 600,
          }}
        >
          $ {price.toFixed(2)}
        </Typography>
      </Box>
    </Grid>
  );
}
