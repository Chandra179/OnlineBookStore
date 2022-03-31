import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GenreList from "../Components/GenreList";
import { genreList } from "../Api";

function Home() {
  // ===========================================================================
  // State
  // ===========================================================================

  const [listOfGenre, setListOfGenre] = useState([]);

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    genreList().then(
      (data) => {
        setListOfGenre(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Grid container mt={1}>
      <GenreList list={listOfGenre} />
    </Grid>
  );
}

export default Home;
