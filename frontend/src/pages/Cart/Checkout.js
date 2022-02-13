import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Checkout({ checkoutItem }) {
  console.log(checkoutItem)

  return (
    <Box
      sx={{
        marginTop: 6,
        minWidth: 300,
        marginRight: 5,
        marginLeft: {
          lg: 2,
          md: 2,
          sm: 6,
          xs: 6,
        },
      }}
    >
      <Box sx={{ boxShadow: 1 }}>
        <Typography variant="h6">Order summary</Typography>
      </Box>
    </Box>
  );
}
