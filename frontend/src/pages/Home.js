import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Categories from "../components/Categories";

function Home() {
  return (
    <Grid container spacing={2} sx={{ marginTop: 5 }}>
      <Grid item lg={3} md={3} sm={3} xs={3}></Grid>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <Typography variant="h4">Books at Alexandria</Typography>
      </Grid>
      <Grid item lg={3} md={3} sm={3} xs={3}>
        <Categories />
      </Grid>
      <Divider
        sx={{ borderRightWidth: 2 }}
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Grid item lg={8} md={8} sm={8} xs={8}></Grid>
    </Grid>
  );
}

export default Home;
