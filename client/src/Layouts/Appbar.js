import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Divider } from "@mui/material";
import AccountIcon from "../Components/AppBar/AccountIcon";
import CartIcon from "../Components/AppBar/CartIcon";
import AccountMenu from "../Components/AppBar/AccountMenu";
import Title from "../Components/AppBar/Title";
import { useAccount, useCart } from "../Hooks";
import { userCartBadge, getCurrentUser, logout } from "../Utils/helpers";

export default function BasicAppbar() {
  // ===========================================================================
  // Context
  // ===========================================================================

  const {
    isAppbarDisabled,
    setIsAppbarDisabled,
    isUserLoggedIn,
    setIsUserLoggedIn,
  } = useAccount();
  const { setCartBadge, cartBadge } = useCart();

  // ===========================================================================
  // State
  // ===========================================================================

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setIsUserLoggedIn(false);
    setCartBadge(0);
    logout();
  };
  
  // ===========================================================================
  // Hooks
  // ===========================================================================

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="inherit">
        <Toolbar>
          <Title isAppbarDisabled={isAppbarDisabled} />
          <Box sx={{ flexGrow: 1 }} />
          {isAppbarDisabled ? (
            <Box />
          ) : (
            <Box sx={{ display: "flex" }}>
              <CartIcon badge={cartBadge} />
              <AccountIcon
                isUserLoggedIn={isUserLoggedIn}
                profileMenuOpen={handleProfileMenuOpen}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Divider sx={{ borderBottomWidth: 2 }} />
      <AccountMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        closeMenu={handleMenuClose}
        logOut={handleLogOut}
      />
    </Box>
  );
}
