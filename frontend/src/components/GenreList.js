import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// MUI
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// SERVICE
import BookService from "../services/book.service";

/* 
  [COMPONENTS: GENRE LIST]
  :rtype: MUI<List>
*/

export default function NestedList() {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    // get books genre list
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
        <Link to={`/genres/${item.name.toLowerCase()}/1`}>
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
