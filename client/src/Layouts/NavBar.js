import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { useAccount } from "../Hooks/index";
import { getCurrentUser, totalCartItems, logout } from "../Utils/helpers";
import AppName from "../Components/NavBar/AppName";
import NavItems from "../Components/NavBar/NavItems";
import CartIcon from "../Components/NavBar/CartIcon";
import AccountIcon from "../Components/NavBar/AccountIcon";
import CustomMenuItem from "../Components/NavBar/MenuItem";
import CustomMenu from "../Components/Menu";
import CustomAppBar from "../Components/NavBar/AppBar";

function Navbar() {
  const { cartBadge, setCartBadge } = useAccount();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const userEmail = getCurrentUser();
    if (userEmail) {
      const items = totalCartItems(userEmail);
      setIsUserLoggedIn(true);
      setCartBadge(items);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    window.location.assign("/");
  };

  return (
    <React.Fragment>
      <CustomAppBar>
        <AppName name={"Alexandria"} />
        <Box flexGrow={1} />
        <NavItems>
          <CartIcon badge={cartBadge} />
          <AccountIcon
            isUserLoggedIn={isUserLoggedIn}
            openMenu={handleMenuOpen}
          />
        </NavItems>
      </CustomAppBar>
      <Divider sx={{ borderBottomWidth: 2 }} />
      <CustomMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        closeMenu={handleMenuClose}
      >
        <CustomMenuItem closeMenu={handleMenuClose} logOut={handleLogout} />
      </CustomMenu>
    </React.Fragment>
  );
}

export default Navbar;
