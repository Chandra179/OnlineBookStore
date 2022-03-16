import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Typography } from "@mui/material";

export default function AccountMenu({
  anchorEl,
  isMenuOpen,
  closeMenu,
  logOut,
}) {
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
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>
        <Link to="/signin" onClick={logOut}>
          <Typography>Logout</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );
}
