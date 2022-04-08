import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

const name = {
  fontSize: 14,
  color: "black",
  "&:hover": {
    textDecoration: "underline"
  },
};

function GenreList({ list }) {
  return (
    <Grid container mt={2}>
      {list.map(function(item, i) {
        return (
          <Grid item lg={6} md={6} sm={6} xs={6} key={i}>
            <Box
              p={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link to={`/genres/${item.name.toLowerCase()}/1`}>
                <Typography sx={name}>{item.name}</Typography>
              </Link>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default GenreList;
