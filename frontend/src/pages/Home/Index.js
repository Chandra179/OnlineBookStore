import React from "react";
import { Grid } from "@mui/material";
import GenreList from "./GenreList";
import { styled } from '@mui/styles';

/*
  Main Page
*/

const GridContainer = styled(Grid)({
  marginTop: 5,
  textAlign: 'center'
});

function Home() {
  return (
    <GridContainer container>
        <GenreList />
    </GridContainer>
  );
}

export default Home;
