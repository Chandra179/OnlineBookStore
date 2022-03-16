import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import styles from "./styles";

export default function Title({ isAppbarDisabled }) {
  return (
    <Box>
      <Link
        to="/"
        onClick={isAppbarDisabled ? () => window.location.assign("/") : null}
      >
        <Typography sx={styles.appName}>Alexandria</Typography>
      </Link>
    </Box>
  );
}
