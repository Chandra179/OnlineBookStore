import React, { useState, useEffect } from "react";

import ShowMoreText from "react-show-more-text";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import BookService from "../services/book.service";
import ShoppingCard from "../components/ShoppingCard";
import BookHelper from "../helper/book.helper";

function BookCover({ bookDetail }) {
  return (
    <Card
      sx={{
        minWidth: 180,
        maxWidth: 180,
        marginRight: 3,
      }}
    >
      <CardMedia component="img" image={bookDetail.cover} />
    </Card>
  );
}

function BookDescription({ bookDetail, expand, expandText }) {
  console.log(bookDetail);

  return (
    <Box sx={{ margin: 0, paddingRight: 5 }}>
      <Typography
        sx={{
          color: "black",
          fontSize: {
            lg: 28,
            md: 28,
            sm: 24,
            xs: 20,
          },
        }}
      >
        {bookDetail.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {BookHelper.bookAuthor(bookDetail.book_author)}
      </Box>

      <Box>
        <ShowMoreText
          lines={5}
          more={"Show More"}
          less={"Show Less"}
          onClick={expandText}
          expanded={expand}
          width={650}
        >
          {bookDetail.description}
        </ShowMoreText>
      </Box>
    </Box>
  );
}

export default function HomeDetail() {
  const [bookDetail, setBookDetail] = useState([]);
  const [expand, setExpand] = useState(false);
  const expandText = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    const name = window.location.pathname.split("/").pop().split("-").join(" ");
    BookService.bookDetail(name).then(
      (data) => {
        setBookDetail(data);
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
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item lg={9} md={12} sm={12} xs={12}>
        <Box
          sx={{
            display: "flex",
            marginTop: 4,
            marginLeft: 4,
          }}
        >
          <BookCover bookDetail={bookDetail} />
          <BookDescription bookDetail={bookDetail} expandText={expandText} />
        </Box>
      </Grid>
      <Grid item lg={3} md={12} sm={12} xs={12}>
        <ShoppingCard bookDetail={bookDetail} />
      </Grid>
    </Grid>
  );
}
