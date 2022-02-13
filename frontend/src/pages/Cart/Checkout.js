import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Checkout({ cartItem, checkoutItem }) {
  console.log(checkoutItem);
  console.log(checkoutItem.length)

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
        {checkoutItem.length === 0 ? <p>0</p> : <p>1</p>}
      </Box>
    </Box>
  );
}
