import React from "react";
import { Box, Typography } from "@mui/material";
import { bookAuthor } from "../../../Utils/helpers";

const wrapSx = {
  alignItems: "baseline",
  width: {
    lg: 600,
    md: 600,
    sm: 600,
    xs: 200,
  },
};
const bySx = {
  fontSize: {
    lg: 14,
    md: 14,
    sm: 12,
    xs: 12,
  },
  marginRight: 0.7,
};
const authorSx = {
  color: "rgb(0, 113, 133)",
  fontSize: 12,
};

export default function BookAuthor({ authorList }) {
  return (
    <Box display="flex" sx={wrapSx}>
      <Typography sx={bySx}>by</Typography>
      <Typography noWrap sx={authorSx}>
        {bookAuthor(authorList)}
      </Typography>
    </Box>
  );
}
