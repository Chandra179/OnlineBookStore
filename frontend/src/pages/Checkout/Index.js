import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressList from './Address/AddressList';
import PaymentForm from './CreditCard/PaymentForm';
import Review from './Review';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

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
