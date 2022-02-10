import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import BookService from "../services/book.service";

export default function NestedList() {
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

  const ListOfGenre = genreList.map(function (item, i) {
    return (
      <ListItem
        key={i}
        sx={{
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        <Link to={`/${item.name.toLowerCase()}/1`}>
          <Typography
            sx={{
              fontSize: 13,
              color: "black",
              "&:hover": {
                color: "blue",
              },
            }}
          >
            {item.name}
          </Typography>
        </Link>
      </ListItem>
    );
  });

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography sx={{ color: "black", fontWeight: 600, fontSize: 17 }}>
            Genre
          </Typography>
        </ListSubheader>
      }
    >
      <Box sx={{ paddingLeft: 1 }}>{ListOfGenre}</Box>
    </List>
  );
}
