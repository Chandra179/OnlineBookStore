import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookService from "../services/book.service";
import { useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function Book({ bookList, currentPage }) {
  // book author
  function bookAuthor(book_author) {
    var bookAuthorLength = book_author.length - 1;
    var authorList = [];

    authorList.push(
      <Typography
        key={"by"}
        sx={{
          fontSize: {
            lg: 17,
            md: 17,
            sm: 17,
            xs: 17,
          },
          paddingRight: 1,
        }}
      >
        by
      </Typography>
    );

    book_author.map((e, i) => {
      var authors =
        i === bookAuthorLength ? e.author_name : e.author_name + ",";
      authorList.push(
        <Typography
          key={i}
          sx={{
            color: "rgb(0, 113, 133)",
            fontSize: {
              lg: 14,
              md: 14,
              sm: 14,
              xs: 14,
            },
            paddingRight: 1,
          }}
        >
          {authors}
        </Typography>
      );
    });
    return authorList;
  }

  return (
    <List>
      {bookList.map(function (item, i) {
        return (
          <div key={i}>
            <ListItem>
              <Grid container direction="row" alignItems="flex-start">
                <Box sx={{ marginRight: 2, boxShadow: 1 }}>
                  <Card sx={{ width: 130 }}>
                    <CardMedia component="img" image={item.cover} />
                  </Card>
                </Box>
                <Grid item lg={8} md={8} sm={6} xs={6}>
                  <ListItemText sx={{ margin: 0, padding: 0 }}>
                    <Link
                      to={{
                        pathname: `/${item.genre.toLowerCase()}/${currentPage}/${item.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: {
                            lg: 20,
                            md: 20,
                            sm: 18,
                            xs: 16,
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Link>
                  </ListItemText>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {bookAuthor(item.book_author)}
                  </Box>
                  <ListItemText sx={{ paddingTop: 1 }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: 500,
                        fontSize: {
                          lg: 16,
                          md: 16,
                          sm: 14,
                          xs: 14,
                        },
                      }}
                    >
                      $ {item.price.toFixed(2)}
                    </Typography>
                  </ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <Divider
              sx={{ margin: "15px 0px 15px 0px", borderBottomWidth: 2 }}
            />
          </div>
        );
      })}
    </List>
  );
}

function MyPagination({ currentPage, totalPageNumber, handlePageClick }) {
  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Pagination
        count={totalPageNumber}
        page={currentPage}
        onChange={handlePageClick}
      />
    </Stack>
  );
}

function BookList() {
  const history = useHistory();

  const bookPerPage = 2;
  const [bookList, setBookList] = useState([]);
  const [totalBook, setTotalBook] = useState(0);

  const genre = window.location.pathname.split("/")[1];
  const page = Number(window.location.pathname.split("/")[2]);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPageNumber = Math.ceil(totalBook / bookPerPage);

  useEffect(() => {
    // set dafault parameter page to 1
    BookService.booksByGenre(genre, page).then(
      (data) => {
        setBookList(data.book);
        setTotalBook(data.total_book);
        setCurrentPage(page);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [genre, page]);

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
    history.push(`/${genre}/${value}`);
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 1 }}>
      <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
      <Grid item lg={10} md={10} sm={10} xs={10}>
        <Book currentPage={currentPage} bookList={bookList} />
        <MyPagination
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          totalPageNumber={totalPageNumber}
        />
      </Grid>
    </Grid>
  );
}

export default BookList;
