import React from "react";
import { Grid } from "@mui/material";
import GenreList from "./GenreList";
import { styled } from '@mui/material/styles';

/*
  Main Page
*/

const RootGrid = styled(Grid)({
  marginTop: 5,
  textAlign: 'center'
});

function Home() {
  return (
    <RootGrid container>
        <GenreList />
    </RootGrid>
  );
}

export default Home;
