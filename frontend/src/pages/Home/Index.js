import React from "react";
import { Grid } from "@mui/material";
import GenreList from "./GenreList";

/*
  Main Page
*/

function Home() {
  return (
    <Grid
      container
      sx={{
        marginTop: 5,
        textAlign: "center",
      }}
    >
      <GenreList />
    </Grid>
  );
}

export default Home;
