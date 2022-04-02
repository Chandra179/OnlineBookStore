import React from "react";
import { Typography, ListItemText } from "@mui/material";

export default function BookPrice({ price }) {
  return (
    <ListItemText>
      <Typography
        sx={{
          color: "black",
          fontWeight: 600,
          fontSize: {
            lg: 16,
            md: 16,
            sm: 14,
            xs: 14,
          },
        }}
      >
        $ {price.toFixed(2)}
      </Typography>
    </ListItemText>
  );
}
