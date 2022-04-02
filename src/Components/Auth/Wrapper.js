import React from "react";
import { Box, Container } from "@mui/material";

export default function Wrapper({ children }) {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          width: 300,
          minWidth: { lg: 420, md: 420, sm: 400, xs: 300 },
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
