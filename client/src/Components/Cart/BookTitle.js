import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Styles from "./Styles";

export default function BookTitle({ title }) {
  return (
    <Grid item lg={9} md={9} sm={9} xs={12} mb={0.4}>
      <Box>
        <Typography sx={Styles.titleText}>{title}</Typography>
      </Box>
    </Grid>
  );
}
