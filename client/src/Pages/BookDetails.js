import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import BookCover from "./contents/BookCover";
import BookDescription from "./contents/BookDescription";
import ShoppingCart from "./contents/ShoppingCart";
import { bookDetails } from "../Api";


function BookDetails() {
  const [book, setBook] = useState({});

  useEffect(() => {
    // get bookName from url path, eg: http/..../steve jobs
    const bookName = window.location.pathname
      .split("/")
      .pop()
      .split("-")
      .join(" ");

    bookDetails(bookName).then(
      (data) => {
        setBook(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Grid
      container
      direction="row"
      display="flex"
      alignItems="flex-start"
      p={4}
    >
      <BookCover cover={book.cover} />
      <BookDescription bookDetails={bookDetails} />
      <ShoppingCart bookDetails={bookDetails} />
    </Grid>
  );
}

export default BookDetails