import React from "react";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookHelper from "../../helper/book.helper";

export default function Book({ bookList, currentPage }) {
  return (
    <Box>
      {bookList.map(function (item, i) {
        return (
          <Box key={i}>
            <Box
              sx={{
                display: "flex",
                marginBottom: 3,
              }}
            >
              <Box sx={{ marginRight: 2 }}>
                <Card
                  sx={{
                    width: { lg: 130, md: 130, sm: 110, xs: 100 },
                  }}
                >
                  <CardMedia component="img" image={item.cover} />
                </Card>
              </Box>
              <Box>
                <ListItemText sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to={{
                      pathname: `/genres/${item.genre.toLowerCase()}/${currentPage}/${item.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: {
                          lg: 18,
                          md: 18,
                          sm: 16,
                          xs: 16,
                        },
                        height: 23,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                </ListItemText>
                {BookHelper.bookAuthor(item.book_author)}
                <ListItemText sx={{ paddingTop: 0 }}>
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: 600,
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
              </Box>
            </Box>
            <Divider
              sx={{ margin: "15px 0px 15px 0px", borderBottomWidth: 2 }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
