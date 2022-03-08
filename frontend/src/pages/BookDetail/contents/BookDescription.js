import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Box, Grid, Typography } from "@mui/material";
import BookHelper from "../../../helper/book.helper";
import PropTypes from "prop-types";


function BookDescription({ bookDetails }) {
  // list of author
  const bookAuthor = BookHelper.bookAuthor(bookDetails.book_author);
  // show more text... show less text....
  const [expandText, setExpandText] = useState(false);
  const handleExpandText = () => {
    setExpandText(!expandText);
  };

  return (
    <Grid item lg={7} md={7} sm={9} xs={12}>
      <Box
        sx={{
          marginTop: { lg: 0, md: 0, sm: 0, xs: 2 },
          paddingRight: { lg: 4, md: 4, sm: 4, xs: 0 },
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontSize: { lg: 24, md: 22, sm: 20, xs: 16 },
            fontWeight: 600,
          }}
        >
          {bookDetails.name}
        </Typography>
        {bookAuthor}
        <Box mt={1}>
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
                fontSize: { lg: 15, md: 14, sm: 13, xs: 12 },
              }}
            >
              {bookDetails.description}
            </Typography>
          </ShowMoreText>
        </Box>
      </Box>
    </Grid>
  );
}

BookDescription.propTypes = {
  bookDetails: PropTypes.object.isRequired
}
export default BookDescription;
