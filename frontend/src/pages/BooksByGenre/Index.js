import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//MUI
import { Pagination } from "@mui/material";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
// COMPONENT
import Books from "./Books";
// SERVICE
import BookService from "../../services/book.service";

function BooksByGenre() {
  const [bookList, setBookList] = useState([]);
  const [totalBook, setTotalBook] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const booksPerPage = 2;
  const history = useHistory();

  // get book genre from url path
  const genre = window.location.pathname.split("/")[2];
  const totalPageNumber = Math.ceil(totalBook / booksPerPage);
  const pageNumber = Number(window.location.pathname.split("/")[3]);

  useEffect(() => {
    BookService.booksByGenre(genre, pageNumber).then(
      (data) => {
        setBookList(data.books);
        setTotalBook(data.total_book);
        setCurrentPage(pageNumber);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [genre, pageNumber]);

  // handle next and previos page click
  const handlePageClick = async (event, value) => {
    await BookService.booksByGenre(genre, value).then(
      (data) => {
        setBookList(data.book);
        setTotalBook(data.total_book);
        setCurrentPage(value);
      },
      (error) => {
        console.log(error);
      }
    );
    // update url path as page number change
    history.push(`/genres/${genre}/${value}`);
  };

  return (
    <Grid container>
      <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
      <Grid item lg={10} md={10} sm={12} xs={12}>
        <Box m={2}>
          <Books currentPage={currentPage} bookList={bookList} />
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Pagination
              count={totalPageNumber}
              page={currentPage}
              onChange={handlePageClick}
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BooksByGenre;
