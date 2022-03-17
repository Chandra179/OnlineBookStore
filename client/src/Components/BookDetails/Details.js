import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Box, Grid, Typography } from "@mui/material";
import { bookAuthor } from "../../Utils/helpers";
import styles from "./styles"; 

function Details({ details }) {
  // list of author
  const authorList = bookAuthor(details.book_author);
  const [expandText, setExpandText] = useState(false);
  
  // show more text... show less text....
  const handleExpandText = () => {
    setExpandText(!expandText);
  };

  return (
    <Grid item lg={7} md={7} sm={9} xs={12}>
      <Box sx={styles.details.wrap} >
        <Typography sx={styles.details.name}>
          {details.name}
        </Typography>
        {authorList}
        <Box mt={1}>
          <ShowMoreText
            lines={5}
            more={"Show More"}
            less={"Show Less"}
            onClick={handleExpandText}
            expanded={expandText}
            className="wrapper"
          >
            <Typography sx={styles.details.desc}>
              {details.description}
            </Typography>
          </ShowMoreText>
        </Box>
      </Box>
    </Grid>
  );
}

export default Details;
