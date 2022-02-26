import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import GenreList from "../components/GenreList";

/*
  Main Page
*/

function Home() {
  return (
    <Grid container spacing={2} sx={{ marginTop: 5 }}>
      <Grid item lg={3} md={3} sm={3} xs={3}></Grid>
      <Grid item lg={9} md={9} sm={9} xs={9}>
        <Typography
          sx={{
            fontSize: {
              lg: 26,
              md: 25,
              sm: 23,
              xs: 20,
            },
          }}
        >
          Books at Alexandria
        </Typography>
      </Grid>
      <Grid item lg={3} md={3} sm={3} xs={12}>
        <GenreList />
      </Grid>
      <Divider
        sx={{ borderRightWidth: 2 }}
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Grid item lg={8} md={8} sm={8} xs={12}></Grid>
    </Grid>
  );
}

export default Home;
