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
    let isMounted = true;
    BookService.genreList().then(
      (data) => {
        if (isMounted) setGenreList(data);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => { isMounted = false };
  }, []);

  
  return (
    <Grid
      container
      sx={{
        marginTop: 1,
        textAlign: "center",
      }}
    >
      <GenreList genreList={genreList} />
    </Grid>
  );
}

export default Home;
