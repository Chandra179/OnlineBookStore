import React from "react";
import { Box, Typography } from "@mui/material";

export default function AuthForm({ name, children }) {
  return (
    <Box
      component="form"
      sx={{
        padding: 3,
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{
          marginBottom: 1.5,
          fontSize: { lg: 26, md: 25, sm: 22, xs: 20 },
        }}
      >
        {name}
      </Typography>
      {children}
    </Box>
  );
}
