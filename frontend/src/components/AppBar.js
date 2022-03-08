import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
// SERVICE
import AuthService from "../services/auth.service";
// HELPER
import CartHelper from "../helper/cart.helper";
// CONTEXT
import { useUser } from "../hooks/useUser";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";


/**
 * STYLING
 */
const appName = {
  color: "blue",
  fontWeight: 650,
  letterSpacing: 1,
  fontsize: { lg: 17, md: 17, sm: 14, xs: 14 },
};

const iconStyle = {
  fontSize: { lg: 25, md: 24, sm: 23, xs: 22 },
  color: "black",
};

const signInStyle = {
  fontSize: 18,
  color: "black",
  "&:hover": { color: "blue" },
};

/**
 * APPBAR
 */
function PrimarySearchAppBar() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useUser();
  const { cartBadge, setCartBadge } = useCart();
  const { isAppbarDisabled, setIsAppbarDisabled } = useCheckout();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    let abortController = new AbortController();
    const userEmail = AuthService.getCurrentUser();
    if (userEmail) {
      setIsUserLoggedIn(true);
      setCartBadge(CartHelper.cartBadge(userEmail));

      var urlPath = window.location.pathname;
      // if user in checkout page, then hide appbar cart and account logo
      if (urlPath === "/cart/checkout") {
        setIsAppbarDisabled(true);
      }
    }
    return () => {
      abortController.abort();  
    }
  }, [setIsUserLoggedIn, setCartBadge, setIsAppbarDisabled]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setIsUserLoggedIn(false);
    setCartBadge(0);
    AuthService.logout();
  };

  /**
   * Account menu
   */
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/signin" onClick={logOut}>
          <Typography>Logout</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  /**
   * Appbar name
   */
  const title = (
    <Box>
      <Link
        to="/"
        onClick={isAppbarDisabled ? () => (window.location.href = "/") : null}
      >
        <Typography sx={appName}>Alexandria</Typography>
      </Link>
    </Box>
  );

  /**
   * Account logo
   */
  const account = isUserLoggedIn ? (
    <Box mt={0.8}>
      <IconButton size="large" onClick={handleProfileMenuOpen}>
        <AccountCircleSharpIcon sx={iconStyle} />
      </IconButton>
    </Box>
  ) : (
    <Box mt={2}>
      <Link to={`/signin`}>
        <Typography sx={signInStyle}>Signin</Typography>
      </Link>
    </Box>
  );

  /**
   * Shopping cart and Account (logo)
   */
  const content = isAppbarDisabled ? (
    <div />
  ) : (
    <Box sx={{ display: "flex" }}>
      <Box m={0.5}>
        <Link to="/cart">
          <IconButton size="large">
            <Badge badgeContent={cartBadge} color="error">
              <LocalMallSharpIcon sx={iconStyle} />
            </Badge>
          </IconButton>
        </Link>
      </Box>
      {account}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="inherit">
        <Toolbar>
          {title}
          <Box sx={{ flexGrow: 1 }} />
          {content}
        </Toolbar>
      </AppBar>
      <Divider sx={{ borderBottomWidth: 2 }} />
      {renderMenu}
    </Box>
  );
}

export default PrimarySearchAppBar;
