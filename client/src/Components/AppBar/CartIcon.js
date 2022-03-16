import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Badge } from "@mui/material";
import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import styles from "./styles";

export default function CartIcon({ badge }) {
  return (
    <Box m={0.5}>
      <Link to="/cart" onClick={() => (window.location.href = "/cart")}>
        <IconButton sisze="large">
          <Badge badgeContent={badge} color="error">
            <LocalMallSharpIcon sx={styles.icon} />
          </Badge>
        </IconButton>
      </Link>
    </Box>
  );
}
