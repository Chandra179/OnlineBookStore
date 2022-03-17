import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const name = {
  fontSize: 13,
  color: "black",
  "&:hover": {
    color: "blue",
  },
};

function GenreList({ list }) {
  return (
    <ListItem>
      {list.map(function (item, i) {
        return (
          <Box key={i} pr={2}>
            <Link to={`/genres/${item.name.toLowerCase()}/1`}>
              <Typography sx={name}>{item.name}</Typography>
            </Link>
          </Box>
        );
      })}
    </ListItem>
  );
}

export default GenreList;
