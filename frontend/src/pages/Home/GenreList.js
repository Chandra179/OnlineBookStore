import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// MUI
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// SERVICE
import BookService from "../../services/book.service";

export default function GenreList() {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    BookService.genreList().then(
      (data) => {
        setGenreList(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <ListItem>
      {genreList.map(function (item, i) {
        return (
          <Box key={i} pr={2}>
            <Link to={`/genres/${item.name.toLowerCase()}/1`}>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "black",
                  "&:hover": {
                    color: "blue",
                  }
                }}
              >
                {item.name}
              </Typography>
            </Link>
          </Box>
        );
      })}
    </ListItem>
  );
}
