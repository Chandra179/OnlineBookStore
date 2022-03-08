import * as React from 'react';
import Grid from "@mui/material/Grid";
import AddressList from './Address/AddressList';
import PaymentForm from './CreditCard/PaymentForm';
import Review from './Review';

export default function Checkout() {
  
  return (
    <Grid container>
      <Grid>
        <AddressList />
      </Grid>
      <Grid>
        <PaymentForm />
      </Grid>
      <Grid>
        <Review />
      </Grid>
    </Grid>
    );
}
