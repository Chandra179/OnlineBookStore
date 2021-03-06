import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const BookCover = ({ cover }) => {
  return (
    <Grid
      item
      lg={2}
      md={2}
      sm={3}
      xs={12}
      display="flex"
      justifyContent="center"
      sx={{
        backgroundColor: {
          lg: "white",
          md: "white",
          sm: "white",
          xs: "rgb(250, 250, 250)",
        },
      }}
    >
      <Card
        sx={{
          minWidth: 120,
          maxWidth: { lg: 170, md: 160, sm: 150, xs: 120 },
          marginRight: { lg: 3, md: 3, sm: 2, xs: 0 },
        }}
      >
        <CardMedia component="img" image={cover} />
      </Card>
    </Grid>
  );
};

export default BookCover;
