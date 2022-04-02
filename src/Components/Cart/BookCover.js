import React from "react";
import { Card, Box, CardMedia } from "@mui/material";

const coverCard = {
  width: 120,
  maxWidth: {
    lg: 120,
    md: 120,
    sm: 110,
    xs: 80,
  },
};

function BookCover({ cover }) {
  return (
    <Box>
      <Card sx={coverCard}>
        <CardMedia component="img" image={cover} />
      </Card>
    </Box>
  );
}

export default BookCover;
