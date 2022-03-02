import React, { useState, useEffect } from "react";
import ShowMoreText from "react-show-more-text";
// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// SERVICE
import BookService from "../../services/book.service";
// COMPONENT
import ShoppingCard from "./ShoppingCard";
// HELPER
import BookHelper from "../../helper/book.helper";


export default function BookDetail() {
  const [bookDetail, setBookDetail] = useState([]);
  // show more text... show less text....
  const [expandText, setExpandText] = useState(false);
  const handleExpandText = () => {
    setExpandText(!expandText);
  };

  useEffect(() => {
    // get bookName from url path, eg: http/..../steve jobs
    const bookName = window.location.pathname
      .split("/")
      .pop()
      .split("-")
      .join(" ");

    BookService.bookDetail(bookName).then(
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
              xs: 0,
            },
          }}
        >
          <CardMedia component="img" image={bookDetail.cover} />
        </Card>
      </Grid>
      <Grid
        item
        lg={7}
        md={7}
        sm={9}
        xs={12}
        sx={{
          marginTop: {
            lg: 0,
            md: 0,
            sm: 0,
            xs: 1,
          },
        }}
      >
        <Box
          sx={{
            margin: 0,
            paddingRight: {
              lg: 4,
              md: 4,
              sm: 0,
              xs: 0,
            },
            paddingTop: 1,
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: {
                lg: 24,
                md: 22,
                sm: 20,
                xs: 16,
              },
              fontWeight: 600,
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
              onClick={handleExpandText}
              expanded={expandText}
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
      </Grid>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <ShoppingCard bookDetail={bookDetail} />
      </Grid>
    </Grid>
  );
}
