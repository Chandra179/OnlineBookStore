import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function YourCart() {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: {
            lg: 18,
            md: 18,
            sm: 16,
            xs: 14,
          },
        }}
      >
        Shopping cart
      </Typography>
    </Box>
  );
}

export default YourCart;
