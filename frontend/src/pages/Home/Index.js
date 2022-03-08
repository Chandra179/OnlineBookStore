import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GenreList from "./GenreList";
import BookService from "../../services/book.service";

/*
  Main Page
*/

function Home() {
  const [genreList, setGenreList] = useState([]);
  
  useEffect(() => {
    BookService.genreList().then(
      (data) => {
        setGenreList(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);


  return (
    <Grid
      container
      mt={1}
      sx={{ textAlign: "center" }}
    >
      <GenreList genreList={genreList} />
    </Grid>
  );
}

export default Home;
