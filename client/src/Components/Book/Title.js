import React from "react";
import { Typography } from "@mui/material";

const styles = {
  list: {
    color: "black",
    fontSize: {
      lg: 18,
      md: 18,
      sm: 16,
      xs: 12,
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

export default function Title({ name, type }) {
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
  return <Typography sx={typeSx}>{name}</Typography>;
}
