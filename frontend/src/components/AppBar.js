import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookIcon from '@mui/icons-material/Book';
import Button from "@mui/material/Button";

import AuthService from "../services/auth.service"
import CartHelper from "../helper/cart.helper";
import { useUser } from "../hooks/useUser";
import { useCart } from "../hooks/useCart";


export default function PrimarySearchAppBar() {
    const { userLoggedIn, setUserLoggedIn } = useUser();
    const { cartLength, setCartLength } = useCart();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        const userEmail = AuthService.getCurrentUser();
        if (userEmail !== '') {
            setUserLoggedIn(true)
            setCartLength(CartHelper.cartLength(userEmail));
        }
    }, [setCartLength]);

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
        setUserLoggedIn(undefined);
        setCartLength(0);
        AuthService.logout();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link to="/signin" onClick={logOut}><p>Logout</p></Link>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to="/book">
                    <IconButton size="large">
                        <BookIcon sx={{ fontSize: 30 }} color="inherit" />
                    </IconButton>
                </Link>
                <p>Book</p>
            </MenuItem>
            <MenuItem>
                <Link to="/cart">
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={cartLength} color="error">
                            <ShoppingCartIcon sx={{ fontSize: 30 }} color="inherit" />
                        </Badge>
                    </IconButton>
                </Link>
                <p>Cart</p>
            </MenuItem>
            {userLoggedIn ? (
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
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
                        <Button
                            variant="h6"
                            component="div"
                            sx={{
                                color: 'blue',
                                display: { xs: 'none', sm: 'block' },
                                fontWeight: 600,
                                letterSpacing: 2
                            }}
                        >
                            Alexandria
                        </Button>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Box sx={{ marginTop: 0.7, marginRight: 2 }}>
                            <Link to="/book">
                                <IconButton size="large">
                                    <BookIcon sx={{ fontSize: 30 }} color="inherit" />
                                </IconButton>
                            </Link>
                        </Box>
                        <Box sx={{ marginTop: 0.80 }}>
                            <Link to="/cart">
                                <IconButton size="large">
                                    <Badge badgeContent={cartLength} color="error">
                                        <ShoppingCartIcon sx={{ fontSize: 30 }} color="inherit" />
                                    </Badge>
                                </IconButton>
                            </Link>
                        </Box>

                        {userLoggedIn ? (
                            <MenuItem onClick={handleProfileMenuOpen}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle sx={{ fontSize: 30 }} />
                                </IconButton>
                            </MenuItem>
                        ) : (
                            <MenuItem>
                                <Link to="/signin">
                                    <Typography variant="p" sx={{ color: 'black' }}>SIGN IN</Typography>
                                </Link>
                            </MenuItem>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
        </Box>
    );
}
