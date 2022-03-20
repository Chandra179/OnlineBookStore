import React from "react";
import { Typography } from "@mui/material";

export default function BookTitle({ title }) {
  return (
    <Typography
      color="black"
      fontWeight={600}
      fontSize={{ lg: 22, md: 20, sm: 18, xs: 16 }}
    >
      {title}
    </Typography>
  );
}
