import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Pagination, Grid, Box } from "@mui/material";
import { getBooksByGenre } from "../Api/index";
import BooksByGenre from "../Components/BooksByGenre";

function Books() {
  const booksPerPage = 2;
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [totalBook, setTotalBook] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPageNumber = Math.ceil(totalBook / booksPerPage);

  // get book genre from url path
  const genre = window.location.pathname.split("/")[2];

  // get page number from url path
  const pageNumber = Number(window.location.pathname.split("/")[3]);

  useEffect(() => {
    getBooksByGenre(genre, pageNumber).then(
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
    navigate(`/genres/${genre}/${value}`);
  };

  console.log(bookList);

  return (
    <Grid container>
      <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
      <Grid item lg={10} md={10} sm={12} xs={12}>
        <Box m={2}>
          <BooksByGenre bookList={bookList} currentPage={currentPage} />
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

export default Books;
