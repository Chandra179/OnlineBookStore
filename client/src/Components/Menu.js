import React from "react";
import { Menu } from "@mui/material";

export default function CustomMenu({
  anchorEl,
  isMenuOpen,
  closeMenu,
  children,
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
      {children}
    </Menu>
  );
}
