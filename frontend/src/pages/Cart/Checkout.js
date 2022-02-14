import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Checkout({ cartItem, selectedCheckbox }) {

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
        {Object.keys(cartItem).map((key, i) => {
          if (selectedCheckbox.includes(key)) {
            return (
              <Box key={i} sx={{ display: "flex" }}>
                <Typography>{key}</Typography>
                <Typography key={i}>{cartItem[key]["qty"]}</Typography>
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
}
