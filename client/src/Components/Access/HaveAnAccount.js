import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

export default function HaveAnAccount({ linkTo, linkToText }) {
  return (
    <Grid container>
      <Grid item>
        <Link to={linkTo}>{linkToText}</Link>
      </Grid>
    </Grid>
  );
}
