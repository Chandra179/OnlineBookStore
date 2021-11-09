import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import AuthService from "../services/auth.service";
import styles from "../static/css/ButtonAppBar.module.css"

const ButtonAppBar = ({ isLoggedin }) => {

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {isLoggedin ? (
                        <a href="/login" onClick={logOut}>
                            <Button color="primary">
                                LogOut
                            </Button>
                        </a>
                    ) : (
                        <Link to={"/login"}>
                            <Button color="inherit">
                                Login
                            </Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/login" component={Login} />
            </Switch>
        </Box>
    )
};
export default ButtonAppBar