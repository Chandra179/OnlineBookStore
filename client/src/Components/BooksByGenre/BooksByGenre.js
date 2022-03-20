import React from "react";
import { Box, Divider } from "@mui/material";
import BookCover from "./Book/BookCover";
import BookTitle from "./Book/BookTitle";
import BookAuthor from "./Book/BookAuthor";
import BookPrice from "./Book/BookPrice";

export default function BooksByGenre({ bookList, currentPage }) {
  return (
    <React.Fragment>
      {bookList.map(function (item, i) {
        return (
          <Box key={i}>
            <Box mb={2} display="flex">
              <BookCover cover={item.cover} />
              <Box>
                <BookTitle
                  name={item.name}
                  genre={item.genre}
                  currentPage={currentPage}
                />
                <BookAuthor authorList={item.book_author} />
                <BookPrice price={item.price} />
              </Box>
            </Box>
            <Divider
              sx={{ margin: "15px 0px 15px 0px", borderBottomWidth: 2 }}
            />
          </Box>
        );
      })}
    </React.Fragment>
  );
}
