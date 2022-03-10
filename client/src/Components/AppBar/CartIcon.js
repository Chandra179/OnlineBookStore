import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Badge } from "@mui/material";
import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import { useCart } from "../../Hooks";
import styles from "./styles";

export default function CartIcon() {
  const { cartBadge } = useCart();

  return (
    <Box m={0.5}>
      <Link to="/cart" onClick={() => (window.location.href = "/cart")}>
        <IconButton sisze="large">
          <Badge badgeContent={cartBadge} color="error">
            <LocalMallSharpIcon sx={styles.icon} />
          </Badge>
        </IconButton>
      </Link>
    </Box>
  );
}
