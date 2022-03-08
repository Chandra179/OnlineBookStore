import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GenreList from "./GenreList";
import BookService from "../../services/book.service";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

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
      mt={1}
      sx={{ textAlign: "center" }}
    >
      <GenreList genreList={genreList} />
    </Grid>
  );
}

export default Home;
