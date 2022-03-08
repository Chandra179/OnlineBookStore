import React from "react";
import { Link } from "react-router-dom";
// MUI
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function GenreList({ genreList }) {
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
