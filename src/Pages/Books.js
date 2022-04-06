import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Pagination, Box, CircularProgress } from "@mui/material";
import { getBooksByGenre } from "../Api/index";
import Wrapper from "../Components/BooksByGenre/Wrapper";
import BooksByGenre from "../Components/BooksByGenre/BooksByGenre";

function Books() {
  // ===========================================================================
  // State
  // ===========================================================================

  const [bookList, setBookList] = useState([]);
  const [totalBook, setTotalBook] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // ===========================================================================
  // Var
  // ===========================================================================

  const booksPerPage = 2;
  const navigate = useNavigate();
  const totalPageNumber = Math.ceil(totalBook / booksPerPage);
  const genre = window.location.pathname.split("/")[2]; // get book genre from url path
  const pageNumber = Number(window.location.pathname.split("/")[3]); // get page number from url path

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handlePageClick = (event, value) => {
    navigate(`/genres/${genre}/${value}`);
  };

  // ===========================================================================
  // Hooks
  // ===========================================================================

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

  if (!bookList.length) {
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Wrapper>
      <BooksByGenre bookList={bookList} currentPage={currentPage} />
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Pagination
          count={totalPageNumber}
          page={currentPage}
          onChange={handlePageClick}
        />
      </Stack>
    </Wrapper>
  );
}

export default Books;
