import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function BookTitle({ name, genre, currentPage }) {
  return (
    <Box>
      <Link
        to={{
          pathname: `/genres/${genre.toLowerCase()}/${currentPage}/${name
            .replace(/\s+/g, "-")
            .toLowerCase()}`,
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontSize: {
              lg: 18,
              md: 18,
              sm: 16,
              xs: 12,
            },
          }}
        >
          {name}
        </Typography>
      </Link>
    </Box>
  );
}
