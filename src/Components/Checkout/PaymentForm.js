import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentProcess from "./PaymentProcess";
import { useOrder } from "../../Hooks";
import { Box, Typography } from "@mui/material";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51J0LjtBMpJ02BJLOvMiwZkBGRdadf6DnazZ36SxSGi1V8eOWdyordBK8nPzgM5PaWLnM9lH9WNMfrLp7MCkuepXU00XSINr65i");

export default function PaymentForm() {
  const { clientSecret } = useOrder()

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Box sx={{ marginTop: {lg:0, md:0, sm:5, xs:5 }}}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentProcess />
        </Elements>
      )}
    </Box>
  );
}