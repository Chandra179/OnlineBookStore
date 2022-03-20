import React, { useState, useEffect } from "react";
import { Grid, Box} from "@mui/material";
import { getBookDetails } from "../Api";
import BookCover from "../Components/BookDetails/BookCover";
import BookDescription from "../Components/BookDetails/BookDescription";
import BookTitle from "../Components/BookDetails/BookTitle";
import BookAuthor from "../Components/BookAuthor";
import ShoppingCart from "../Components/ShoppingCart";

const wrapper = {
  marginTop: { lg: 0, md: 0, sm: 0, xs: 2 },
  paddingRight: { lg: 4, md: 4, sm: 4, xs: 0 },
};

function BookDetails() {
  const [bookDetails, setBookDetails] = useState({});

  useEffect(() => {
    // get bookName from url path, eg: http/..../steve jobs
    const bookName = window.location.pathname
      .split("/")
      .pop()
      .split("-")
      .join(" ");

    getBookDetails(bookName).then(
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
      <Grid item lg={7} md={7} sm={9} xs={12}>
        <Box sx={wrapper}>
          <BookTitle title={bookDetails.name} />
          <BookAuthor authorList={bookDetails.book_author} />
          <BookDescription description={bookDetails.description} />
        </Box>
      </Grid>
      <ShoppingCart
        price={bookDetails.price}
        stock={bookDetails.stock}
        name={bookDetails.name}
        cover={bookDetails.cover}
      />
    </Grid>
  );
}

export default BookDetails;
