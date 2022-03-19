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
          width: 280,
          minWidth: { lg: 420, md: 420, sm: 400, xs: 280 },
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
