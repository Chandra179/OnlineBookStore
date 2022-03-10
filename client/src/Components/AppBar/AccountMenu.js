import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Typography } from "@mui/material";
import { logout } from "../../Utils/helpers";
import { useAccount, useCart } from "../../Hooks";

export default function AccountMenu() {
  const { setCartBadge } = useCart();
  const { anchorEl, setAnchorEl, setIsUserLoggedIn } = useAccount();
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setIsUserLoggedIn(false);
    setCartBadge(0);
    logout();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/signin" onClick={handleLogOut}>
          <Typography>Logout</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );
}
