import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useCart } from "../Hooks";
import { getCurrentUser, totalCartItems, logout } from "../Utils/helpers";
import CartIcon from "../Components/NavBar/CartIcon";
import AccountIcon from "../Components/NavBar/AccountIcon";
import CustomMenuItem from "../Components/NavBar/MenuItem";
import CustomMenu from "../Components/Menu";
import CustomAppBar from "../Components/NavBar/AppBar";

function Navbar() {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { cartBadge, setCartBadge } = useCart();

  // ===========================================================================
  // State
  // ===========================================================================

  const [anchorEl, setAnchorEl] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // ===========================================================================
  // Var
  // ===========================================================================

  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setCartBadge(0);
    setIsUserLoggedIn(false);
    navigate("/");
  };

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    const userEmail = getCurrentUser();
    if (userEmail) {
      setIsUserLoggedIn(true);
      setCartBadge(totalCartItems(userEmail));
    }
  }, [cartBadge, setCartBadge]);

  return (
    <React.Fragment>
      <CustomAppBar>
        <CartIcon badge={cartBadge} />
        <AccountIcon
          isUserLoggedIn={isUserLoggedIn}
          openMenu={handleMenuOpen}
        />
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
