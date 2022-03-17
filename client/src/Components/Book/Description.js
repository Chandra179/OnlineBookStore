import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Box, Grid, Typography } from "@mui/material";
import { bookAuthor } from "../../Utils/helpers";

const wrapSx = {
  marginTop: { lg: 0, md: 0, sm: 0, xs: 2 },
  paddingRight: { lg: 4, md: 4, sm: 4, xs: 0 },
};
const authorSx = {
  color: "black",
  fontSize: { lg: 24, md: 22, sm: 20, xs: 16 },
  fontWeight: 600,
};
const descSx = {
  fontSize: { lg: 15, md: 14, sm: 13, xs: 12 },
};

function Details({ authorList, name, description }) {
  // list of author
  const authors = bookAuthor(authorList);
  const [expandText, setExpandText] = useState(false);

  // show more text... show less text....
  const handleExpandText = () => {
    setExpandText(!expandText);
  };

  return (
    <Grid item lg={7} md={7} sm={9} xs={12}>
      <Box sx={wrapSx}>
        <Typography sx={authorSx}>{name}</Typography>
        {authors}
        <Box mt={1}>
          <ShowMoreText
            lines={5}
            more={"Show More"}
            less={"Show Less"}
            onClick={handleExpandText}
            expanded={expandText}
            className="wrapper"
          >
            <Typography sx={descSx}>{description}</Typography>
          </ShowMoreText>
        </Box>
      </Box>
    </Grid>
  );
}

export default Details;
