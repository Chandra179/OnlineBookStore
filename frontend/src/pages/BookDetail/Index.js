import React, { useState, useEffect } from "react";

import ShowMoreText from "react-show-more-text";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import BookService from "../../services/book.service";
import ShoppingCard from "./ShoppingCard";
import BookHelper from "../../helper/book.helper";

function BookCover({ bookDetail }) {
  return (
    <Card
      sx={{
        minWidth: 120,
        maxWidth: {
          lg: 170,
          md: 160,
          sm: 150,
          xs: 120,
        },
        marginRight: {
          lg: 3,
          md: 3,
          sm: 3,
          xs: 0
        },
      }}
    >
      <CardMedia component="img" image={bookDetail.cover} />
    </Card>
  );
}

function BookDescription({ bookDetail, expand, expandText }) {
  return (
    <Box sx={{ margin: 0, paddingRight: { lg: 4, md: 4, sm: 0, xs: 0 } }}>
      <Typography
        sx={{
          color: "black",
          fontSize: {
            lg: 24,
            md: 22,
            sm: 20,
            xs: 18,
          }
        }}
      >
        {bookDetail.name}
      </Typography>

      {BookHelper.bookAuthor(bookDetail.book_author)}

      <Box sx={{ marginTop: 1 }}>
        <ShowMoreText
          lines={5}
          more={"Show More"}
          less={"Show Less"}
          onClick={expandText}
          expanded={expand}
          className="wrapper"
        >
          <Typography
            sx={{
              fontSize: {
                lg: 15,
                md: 14,
                sm: 13,
                xs: 12,
              },
            }}
          >
            {bookDetail.description}
          </Typography>
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
      display="flex"
      alignItems="flex-start"
      sx={{ padding: 4 }}
    >
      <Grid
        item
        lg={2}
        md={2}
        sm={3}
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: {
            lg: "white",
            md: "white",
            sm: "white",
            xs: "rgb(250, 250, 250)",
          },
        }}
      >
        <BookCover bookDetail={bookDetail} />
      </Grid>
      <Grid
        item
        lg={7}
        md={7}
        sm={9}
        xs={12}
        sx={{ marginTop: { lg: 0, md: 0, sm: 0, xs: 1 } }}
      >
        <BookDescription bookDetail={bookDetail} expandText={expandText} />
      </Grid>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <ShoppingCard bookDetail={bookDetail} />
      </Grid>
    </Grid>
  );
}
