import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const styles = {
  list: {
    width: {
      lg: 130,
      md: 130,
      sm: 110,
      xs: 100,
    },
  },
  details: {
    minWidth: 120,
    maxWidth: { lg: 170, md: 160, sm: 150, xs: 120 },
    marginRight: { lg: 3, md: 3, sm: 2, xs: 0 },
  },
  cart: {
    minWidth: 120,
    maxWidth: { lg: 170, md: 160, sm: 150, xs: 120 },
    marginRight: { lg: 3, md: 3, sm: 2, xs: 0 },
  },
};

const Cover = ({ cover, type }) => {
  let typeSx;
  switch (type) {
    case "list":
      typeSx = styles.list;
      break;
    case "detail":
      typeSx = styles.details;
      break;
    case "cart":
      typeSx = styles.cart;
  }

  return (
    <Card sx={typeSx}>
      <CardMedia component="img" image={cover} />
    </Card>
  );
};

export default Cover;
