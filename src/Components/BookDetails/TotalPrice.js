import React from "react";
import { Box, Typography } from "@mui/material";

export default function TotalPrice({ price }) {
  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: 1,
        paddingLeft: 1.5,
        paddingBottom: 1,
        alignItems: "center",
      }}
    >
      <Typography sx={{ letterSpacing: 1 }}>Subtotal</Typography>
      <Box pr={2} sx={{ marginLeft: "auto" }}>
        <Typography variant="h6">
          $ {price}
        </Typography>
      </Box>
    </Box>
  );
}
