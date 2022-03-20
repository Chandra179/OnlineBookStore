import React from "react";
import { Typography } from "@mui/material";

export default function BookTitle({ title }) {
  return (
    <Typography
      sx={{
        color: "black",
        fontSize: { lg: 24, md: 22, sm: 20, xs: 16 },
        fontWeight: 600,
      }}
    >
      {title}
    </Typography>
  );
}
