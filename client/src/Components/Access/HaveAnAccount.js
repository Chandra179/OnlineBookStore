import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

export default function HaveAnAccount({ linkTo, linkToText, align }) {
  return (
    <Grid container justifyContent={align}>
      <Grid item>
        <Link to={linkTo}>{linkToText}</Link>
      </Grid>
    </Grid>
  );
}
