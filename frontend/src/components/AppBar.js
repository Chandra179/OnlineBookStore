import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

import AuthService from "../services/auth.service";
import CartHelper from "../helper/cart.helper";
import { useUser } from "../hooks/useUser";
import { useCart } from "../hooks/useCart";

export default function PrimarySearchAppBar() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useUser();
  const { cartBadge, setCartBadge } = useCart();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const userEmail = AuthService.getCurrentUser();
    if (userEmail) {
      setIsUserLoggedIn(true);
      setCartBadge(CartHelper.cartBadge(userEmail));
    }
  }, [setIsUserLoggedIn, setCartBadge]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    setIsUserLoggedIn(false);
    setCartBadge(0);
    AuthService.logout();
  };

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
          <p>Logout</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/cart">
          <IconButton size="large" aria-label="show 4 new mails">
            <Badge badgeContent={cartBadge} color="error">
              <LocalMallSharpIcon sx={{ fontSize: 25, color: "black" }} />
            </Badge>
          </IconButton>
        </Link>
        <p>Cart</p>
      </MenuItem>

      {isUserLoggedIn ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircleSharpIcon
              sx={{
                fontSize: 25,
                color: "black",
              }}
            />
          </IconButton>
          <p>Account</p>
        </MenuItem>
      ) : (
        <MenuItem>
          <Link to="/signin" onClick={logOut}>
            <IconButton size="large" color="inherit">
              <LoginIcon />
            </IconButton>
            <Typography variant="p">Sign in</Typography>
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="inherit">
        <Toolbar>
          <Link to="/">
            <Typography
              sx={{
                color: "blue",
                display: { xs: "none", sm: "block" },
                fontWeight: 650,
                fontSize: {
                  lg: 18,
                  md: 18,
                  sm: 17,
                  xs: 12,
                },
                letterSpacing: 1,
              }}
            >
              Alexandria
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Box sx={{ marginTop: 0.52, marginRight: 1 }}>
              <Link to="/cart">
                <IconButton size="large">
                  <Badge badgeContent={cartBadge} color="error">
                    <LocalMallSharpIcon sx={{ fontSize: 25, color: "black" }} />
                  </Badge>
                </IconButton>
              </Link>
            </Box>

            {isUserLoggedIn ? (
              <Box sx={{ marginTop: 0.72 }}>
                <IconButton size="large" onClick={handleProfileMenuOpen}>
                  <AccountCircleSharpIcon
                    sx={{ color: "black", fontSize: 25 }}
                  />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ paddingTop: 2 }}>
                <Link to={`/signin`}>
                  <Typography
                    sx={{
                      fontSize: 18,
                      color: "black",
                      "&:hover": {
                        color: "blue",
                      },
                    }}
                  >
                    Signin
                  </Typography>
                </Link>
              </Box>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Divider sx={{ borderBottomWidth: 2 }} />
    </Box>
  );
}
