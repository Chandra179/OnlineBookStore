import React from "react";
import { Card, CardMedia, Box } from "@mui/material";

const BookCover = ({ cover }) => {
  return (
    <Box mr={1}>
      <Card
        sx={{
          width: {
            lg: 130,
            md: 130,
            sm: 110,
            xs: 100,
          },
        }}
      >
        <CardMedia component="img" image={cover} />
      </Card>
    </Box>
  );
};

export default BookCover;
