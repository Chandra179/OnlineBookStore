import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useAccount } from "../../Hooks";
import styles from "./styles";

export default function AccountIcon() {
  const { isUserLoggedIn, setAnchorEl } = useAccount();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const account = isUserLoggedIn ? (
    <Box mt={0.8}>
      <IconButton size="large" onClick={handleProfileMenuOpen}>
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

  return account;
}
