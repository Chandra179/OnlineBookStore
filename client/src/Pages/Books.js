import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Pagination, Grid, Box, ListItemText, Divider } from "@mui/material";
import Cover from "../Components/Book/Cover";
import Title from "../Components/Book/Title";
import Author from "../Components/Book/Author";
import Price from "../Components/Book/Price";
import { booksByGenre } from "../Api/index";

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
    booksByGenre(genre, pageNumber).then(
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
    await booksByGenre(genre, value).then(
      (data) => {
        setBookList(data.books);
        setTotalBook(data.total_book);
        setCurrentPage(value);
      },
      (error) => {
        console.log(error);
      }
    );
    // update url path as page number change
    navigate(`/genres/${genre}/${value}`);
  };

  return (
    <Grid container>
      <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
      <Grid item lg={10} md={10} sm={12} xs={12}>
        <Box m={2}>
          {bookList.map(function (item, i) {
            return (
              <Box key={i}>
                <Box mb={2} sx={{ display: "flex" }}>
                  <Box mr={1}>
                    <Cover cover={item.cover} type={"list"} />
                  </Box>
                  <Box>
                    <Box>
                      <Link
                        to={{
                          pathname: `/genres/${item.genre.toLowerCase()}/${currentPage}/${item.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`,
                        }}
                      >
                        <Title name={item.name} type={"list"} />
                      </Link>
                    </Box>
                    <Author authorList={item.book_author} />
                    <ListItemText>
                      <Price price={item.price.toFixed(2)} type={"list"} />
                    </ListItemText>
                  </Box>
                </Box>
                <Divider
                  sx={{ margin: "15px 0px 15px 0px", borderBottomWidth: 2 }}
                />
              </Box>
            );
          })}
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
