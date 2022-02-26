import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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


export default function PrimarySearchAppBar() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useUser();
  const { cartBadge, setCartBadge } = useCart();
  const { isAppbarDisabled, setIsAppbarDisabled } = useCheckout();

  const [anchorEl, setAnchorEl] = useState(null);
  const userEmail = AuthService.getCurrentUser();
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (userEmail) {
      setIsUserLoggedIn(true);
      // cartBadge = total item in cart
      setCartBadge(CartHelper.cartBadge(userEmail));

      // if user in checkout page, then disable appbar cart and account
      var urlPath = window.location.pathname;
      if (urlPath === "/cart/checkout") {
        setIsAppbarDisabled(true);
        return;
      }
    }
  }, [setIsUserLoggedIn, setCartBadge, setIsAppbarDisabled, userEmail]);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static" color="inherit">
        <Toolbar>
          <Link
            to="/"
            onClick={
              isAppbarDisabled ? () => (window.location.href = "/") : null
            }
          >
            <Typography
              sx={{
                color: "blue",
                fontWeight: 650,
                fontSize: {
                  lg: 17,
                  md: 17,
                  sm: 14,
                  xs: 14,
                },
                letterSpacing: 1,
              }}
            >
              Alexandria
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          {/* 
            NESTED CONDITION RENDER
            {isAppbarDisabled{isUserLoggedIn}}
          */}

          {isAppbarDisabled ? (
            <></>
          ) : (
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginTop: 0.52, marginRight: 1 }}>
                <Link to="/cart">
                  <IconButton size="large">
                    <Badge badgeContent={cartBadge} color="error">
                      <LocalMallSharpIcon
                        sx={{
                          fontSize: { lg: 25, md: 24, sm: 23, xs: 22 },
                          color: "black",
                        }}
                      />
                    </Badge>
                  </IconButton>
                </Link>
              </Box>

              {isUserLoggedIn ? (
                <Box sx={{ marginTop: 0.72 }}>
                  <IconButton size="large" onClick={handleProfileMenuOpen}>
                    <AccountCircleSharpIcon
                      sx={{
                        color: "black",
                        fontSize: { lg: 25, md: 24, sm: 23, xs: 22 },
                      }}
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
          )}
        </Toolbar>
      </AppBar>
      <Divider sx={{ borderBottomWidth: 2 }} />
      {renderMenu}
    </Box>
  );
}
