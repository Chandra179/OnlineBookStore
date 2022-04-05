import React from "react";
import { Box, Grid } from "@mui/material";
import PaymentForm from "../Components/Checkout/PaymentForm";

export default function Checkout() {
  return (
    <Grid container>
      <Grid lg={6} md={6} sm={6} xs={6} sx={{ boxShadow: 1 }}>
        <Box display="flex" alignItems="flex-start" flexDirection="column">
          <Box>shipping</Box>
          <Box>order summary</Box>
        </Box>
      </Grid>
      <Grid lg={6} md={6} sm={6} xs={6} sx={{ boxShadow: 1 }}>
        <Box>
          <PaymentForm />
        </Box>
      </Grid>
    </Grid>
  );
}
