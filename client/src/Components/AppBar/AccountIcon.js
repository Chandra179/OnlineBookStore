import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import styles from "./styles";

export default function AccountIcon({ isUserLoggedIn, profileMenuOpen }) {
  return isUserLoggedIn ? (
    <Box mt={0.1}>
      <IconButton size="large" onClick={profileMenuOpen}>
        <AccountCircleSharpIcon sx={styles.icon} />
      </IconButton>
    </Box>
  ) : (
    <Box mt={1.5}>
      <Link to={`/signin`}>
        <Typography sx={styles.signInText}>Signin</Typography>
      </Link>
    </Box>
  );
}
