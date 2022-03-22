import React from "react";
import { Box } from "@mui/material";

export default function HeaderWrapper({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: {
          lg: 5,
          md: 5,
          sm: 5,
          xs: 2,
        },
        marginTop: 6,
        justifyContent: "space-between",
      }}
    >
        {children}
    </Box>
  );
}
