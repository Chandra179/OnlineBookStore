import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import NavItems from "./NavItems";
import AppName from "./AppName";

export default function CustomAppBar({ children }) {
  return (
    <AppBar elevation={0} position="static" color="inherit">
      <Toolbar>
        <AppName name={"Alexandria"} />
        <Box flexGrow={1} />
        <NavItems>{children}</NavItems>
      </Toolbar>
    </AppBar>
  );
}
