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

function BookCover({ bookCover }) {
  return (
    <Box>
      <Card sx={coverCard}>
        <CardMedia component="img" image={bookCover} />
      </Card>
    </Box>
  );
}

export default BookCover;
