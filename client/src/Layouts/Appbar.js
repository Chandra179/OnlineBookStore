import React from "react";
import { AppBar, Box, Toolbar, Divider } from "@mui/material";
import AccountIcon from "../Components/AppBar/AccountIcon";
import CartIcon from "../Components/AppBar/CartIcon";
import AccountMenu from "../Components/AppBar/AccountMenu";
import Title from "../Components/AppBar/Title";
import { useAccount } from "../Hooks";

export default function BasicAppbar() {
  const { isAppbarDisabled } = useAccount();

  const content = isAppbarDisabled ? (
    <div />
  ) : (
    <Box sx={{ display: "flex" }}>
      <CartIcon />
      <AccountIcon />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="inherit">
        <Toolbar>
            <Title />
          <Box sx={{ flexGrow: 1 }} />
          {content}
        </Toolbar>
      </AppBar>
      <Divider sx={{ borderBottomWidth: 2 }} />
      <AccountMenu />
    </Box>
  );
}
