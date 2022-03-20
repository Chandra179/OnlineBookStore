import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Typography, Box } from "@mui/material";

function BookDescription({ description }) {
  const [expandText, setExpandText] = useState(false);

  // show more text... show less text....
  const handleExpandText = () => {
    setExpandText(!expandText);
  };

  return (
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
          fontSize={{
            lg: 15,
            md: 14,
            sm: 13,
            xs: 12,
          }}
        >
          {description}
        </Typography>
      </ShowMoreText>
    </Box>
  );
}

export default BookDescription;
