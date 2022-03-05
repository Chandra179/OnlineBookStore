import React, { useState, useEffect } from "react";
// MUI
import Grid from "@mui/material/Grid";
// SERVICE
import BookService from "../../services/book.service";
// COMPONENTS
import BookCover from "./contents/BookCover";
import BookDescription from "./contents/BookDescription";
import ShoppingCart from "./contents/ShoppingCart";

/**
 * Main function
 */
export default function BookDetails() {
  const [bookDetails, setBookDetails] = useState([]);

  useEffect(() => {
    // get bookName from url path, eg: http/..../steve jobs
    const bookName = window.location.pathname
      .split("/")
      .pop()
      .split("-")
      .join(" ");

    BookService.bookDetails(bookName).then(
      (data) => {
        setBookDetails(data);
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
      <BookCover cover={bookDetails.cover} />
      <BookDescription bookDetails={bookDetails} />
      <ShoppingCart bookDetails={bookDetails} />
    </Grid>
  );
}
