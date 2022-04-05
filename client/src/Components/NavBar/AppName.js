import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function AppName({ name }) {
  return (
    <Box>
      <Link to="/">
        <Typography
          color="blue"
          fontWeight={650}
          letterSpacing={1}
          fontSize={{
            lg: 17,
            md: 17,
            sm: 14,
            xs: 14,
          }}
        >
          {name}
        </Typography>
      </Link>
    </Box>
  );
}
