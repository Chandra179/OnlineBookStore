import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import AuthService from "../services/auth.service"

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    setCurrentUser(undefined);
    AuthService.logout();
  };

  return (
    <div>
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
            {currentUser ? (
              <Link to="/signin" onClick={logOut}>
                <Button color="primary">
                  <Typography variant="p" color="common.white">
                    Logout
                  </Typography>
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button color="inherit">
                  <Typography variant="p" color="common.white">
                    Sign In
                  </Typography>
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {/* <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/signin"
          component={() => <SignIn changeUserState={currentUser => setCurrentUser(currentUser)} />} />
        <Route exact path="/signup"
          component={() => <SignUp changeUserState={currentUser => setCurrentUser(currentUser)} />} />
        <Route exact path="/home-detail/:title/"
          component={HomeDetail} />
      </Switch> */}
    </div>
  );
};

export default Navbar;