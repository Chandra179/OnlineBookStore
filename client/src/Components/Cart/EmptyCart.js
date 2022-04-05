import React from "react";
import { Box, Card, Button, Typography, CardMedia } from "@mui/material";

export default function EmptyCart() {
  return (
    <Box mt={3} display="flex" flexDirection="column" alignItems="center">
      <Card
        sx={{
          width: {
            lg: 550,
            md: 550,
            sm: 550,
            xs: 350,
          },
          boxShadow: "none",
        }}
      >
        <CardMedia component="img" image="/imajes.jpg" />
      </Card>
      <Box mt={2}>
        <Button
          sx={{
            height: 35,
            width: 150,
            textTransform: "none",
          }}
          variant="contained"
        >
          <Typography
            sx={{
              fontSize: 12,
              letterSpacing: 1,
            }}
          >
            Shop Now
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
