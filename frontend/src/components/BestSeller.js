import React, { useState, useEffect } from "react";
// MUI
import BookService from "../services/book.service";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

/*
  TOP 10 BOOKS, ON PROGRESS
*/

function BooksPerGenre() {
  const [booksPerGenre, setBooksPerGenre] = useState([]);

  useEffect(() => {
    BookService.booksPerGenre().then(
      (data) => {
        setBooksPerGenre(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const bookPerGenreList = () => {
    var result = [];
    for (const item in booksPerGenre) {
      result.push(<Typography key={item}>{item}</Typography>);
      booksPerGenre[item].map((e, i) =>
        result.push(<MenuItem key={e.name}>{e.name}</MenuItem>)
      );
    }
    return result;
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        {bookPerGenreList()}
      </Grid>
    </Grid>
  );
}

export default BooksPerGenre;
