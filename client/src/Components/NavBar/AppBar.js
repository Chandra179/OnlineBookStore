import React from "react";
import { AppBar, Toolbar } from "@mui/material";

export default function CustomAppBar({ children }) {
  return (
    <AppBar elevation={0} position="static" color="inherit">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
