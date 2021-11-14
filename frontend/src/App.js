import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AuthService from "./services/auth.service";
import ButtonAppBar from "./components/ButtonAppBar"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home"


const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div>
      <ButtonAppBar isLoggedin={currentUser} />
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};

export default App;