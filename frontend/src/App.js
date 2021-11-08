import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import ButtonAppBar from "./components/ButtonAppBar"

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
        <ButtonAppBar isLoggedin={currentUser} />
        {currentUser ? (
          <div>
            <li>
                {currentUser}
            </li>
            <li>
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div>
            <li>
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}

      <div className="container mt-3">
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
};

export default App;