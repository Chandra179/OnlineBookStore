import React from "react";
import { Box, Grid } from "@mui/material";
import PaymentForm from "../Components/Checkout/PaymentForm";
import OrderSummary from "../Components/Checkout/OrderSummary";

export default function Checkout() {
  return (
    <Grid container>
      <Grid item lg={7} md={12} sm={12} xs={12} sx={{ boxShadow: 1 }}>
        <Box display="flex" alignItems="flex-start" flexDirection="column">
          <Box>shipping</Box>
          <Box>
            <OrderSummary />
          </Box>
        </Box>
      </Grid>
      <Grid item lg={5} md={12} sm={12} xs={12} sx={{ boxShadow: 1 }}>
        <Box>
          <PaymentForm />
        </Box>
      </Grid>
    </Grid>
  );
}
