import React from "react";
import { Typography } from "@mui/material";

const styles = {
  list: {
    color: "black",
    fontWeight: 600,
    fontSize: {
      lg: 16,
      md: 16,
      sm: 14,
      xs: 14,
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

export default function Price({ price, type }) {
  let typeSx;
  switch (type) {
    case "list":
      typeSx = styles.list;
      break;
    case "details":
      typeSx = styles.details;
      break;
    case "cart":
      typeSx = styles.cart;
  }
  return <Typography sx={typeSx}>$ {price}</Typography>;
}
