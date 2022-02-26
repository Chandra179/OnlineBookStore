import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Books from "./Books";
import CustomPagination from "./CustomPagination";
import BookService from "../../services/book.service";

function BookList() {
  const [bookList, setBookList] = useState([]);
  const [totalBook, setTotalBook] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const history = useHistory();
  const bookPerPage = 2;
  const genre = window.location.pathname.split("/")[2];
  const pageNumber = Number(window.location.pathname.split("/")[3]);
  const totalPageNumber = Math.ceil(totalBook / bookPerPage);

  useEffect(() => {
    BookService.booksByGenre(genre, pageNumber).then(
      (data) => {
        setBookList(data.book);
        setTotalBook(data.total_book);
        setCurrentPage(pageNumber);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [genre, pageNumber]);

  const handlePageClick = async (event, value) => {
    // set param page to clicked page number
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
    history.push(`/genres/${genre}/${value}`);
  };

  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
      <Grid item lg={10} md={10} sm={12} xs={12}>
        <Box sx={{ margin: 2 }}>
          <Books currentPage={currentPage} bookList={bookList} />
          <CustomPagination
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            totalPageNumber={totalPageNumber}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default BookList;
