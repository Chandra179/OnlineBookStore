import React from "react";
import { Grid } from "@mui/material";
import PaymentForm from "../Components/Checkout/PaymentForm";
import OrderSummary from "../Components/Checkout/OrderSummary";

export default function Checkout() {
  return (
    <Grid
      container
      sx={{
        padding: {
          lg: 3,
          md: 3,
          sm: 3,
          xs: 2,
        },
      }}
    >
      <Grid item lg={7} md={7} sm={12} xs={12}>
        <OrderSummary />
      </Grid>
      <Grid item lg={5} md={5} sm={12} xs={12}>
        <PaymentForm />
      </Grid>
    </Grid>
  );
}
