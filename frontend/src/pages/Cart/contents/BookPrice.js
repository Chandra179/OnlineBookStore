import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Styles from '../Styles';

export default function BookPrice({ totalPrice }) {
  return (
    <Grid item lg={3} md={3} sm={3} xs={12}>
    <Box sx={Styles.priceBox}>
      <Typography sx={Styles.priceText}>
        $ {totalPrice.toFixed(2)}
      </Typography>
    </Box>
  </Grid>
  )
}
