import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Typography } from "@mui/material";

function Description({ desc }) {
  const [expandText, setExpandText] = useState(false);

  // show more text... show less text....
  const handleExpandText = () => {
    setExpandText(!expandText);
  };

  return (
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
        {desc}
      </Typography>
    </ShowMoreText>
  );
}

export default Description;
