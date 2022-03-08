import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useOrder } from "../../../hooks/useOrder";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51J0LjtBMpJ02BJLOvMiwZkBGRdadf6DnazZ36SxSGi1V8eOWdyordBK8nPzgM5PaWLnM9lH9WNMfrLp7MCkuepXU00XSINr65i");

export default function PaymentForm() {
  const { clientSecret } = useOrder()
  console.log('tesss', clientSecret)

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}