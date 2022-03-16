import React from "react";
import { Typography } from "@mui/material";

export default function AccessName({ name }) {
  return (
    <Typography
      sx={{
        marginBottom: 2,
        fontSize: { lg: 26, md: 26, sm: 24, xs: 22 },
      }}
    >
      {name}
    </Typography>
  );
}
