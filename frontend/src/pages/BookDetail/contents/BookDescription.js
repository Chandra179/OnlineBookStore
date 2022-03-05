import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Box, Grid, Typography } from "@mui/material";
import BookHelper from "../../../helper/book.helper";
import Styles from "../Styles";

/**
 * @param {list} bookDetails
 */
function BookDescription ({ bookDetails }) {
    // list of author
    const bookAuthor = BookHelper.bookAuthor(bookDetails.book_author);
    // show more text... show less text....
    const [expandText, setExpandText] = useState(false);
    const handleExpandText = () => {
      setExpandText(!expandText);
    };

    return (
    <Grid item lg={7} md={7} sm={9} xs={12}>
      <Box sx={Styles.bookDesc.Box}>
        <Typography sx={Styles.bookDesc.Title}>
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
            <Typography sx={Styles.bookDesc.Description}>
              {bookDetails.description}
            </Typography>
          </ShowMoreText>
        </Box>
      </Box>
    </Grid>
  );
};

export default BookDescription;
