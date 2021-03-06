import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import styles from "./styles";

export default function AccountIcon({ isUserLoggedIn, openMenu }) {
  return isUserLoggedIn ? (
    <IconButton size="large" onClick={openMenu}>
      <AccountCircleSharpIcon sx={styles.icon} />
    </IconButton>
  ) : (
    <Link to={`/signin`}>
      <Typography
        fontSize={17}
        color="black"
        sx={{
          "&:hover": { color: "blue" },
        }}
      >
        signin
      </Typography>
    </Link>
  );
}
