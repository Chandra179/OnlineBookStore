import React, { useEffect } from "react";
import { AppBar, Box, Toolbar, Divider } from "@mui/material";
import AccountIcon from "../Components/AppBar/AccountIcon";
import CartIcon from "../Components/AppBar/CartIcon";
import AccountMenu from "../Components/AppBar/AccountMenu";
import Title from "../Components/AppBar/Title";
import { useAccount, useCart } from "../Hooks";
import { userCartBadge, getCurrentUser } from "../Utils/helpers";

export default function BasicAppbar() {
  const { isAppbarDisabled, setIsAppbarDisabled, setIsUserLoggedIn } = useAccount();
  const { setCartBadge } = useCart();

  useEffect(() => {
    const userEmail = getCurrentUser();
    if (userEmail) {
      const urlPath = window.location.pathname;
      
      // if user in checkout page, then hide cart and account logo
      if (urlPath === "/cart/checkout") {
        setIsAppbarDisabled(true);
        return;
      }
      const cartBadge = userCartBadge(userEmail);
      setIsUserLoggedIn(true);
      setCartBadge(cartBadge);
    }
  }, [setIsUserLoggedIn, setCartBadge, setIsAppbarDisabled]);

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
