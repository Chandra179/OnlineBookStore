import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Styles from './Styles';

export default function BookTotalPrice({ price }) {
  return (
    <Grid item lg={3} md={3} sm={3} xs={12}>
    <Box sx={Styles.priceBox}>
      <Typography sx={Styles.priceText}>
        $ {price.toFixed(2)}
      </Typography>
    </Box>
  </Grid>
  )
}
