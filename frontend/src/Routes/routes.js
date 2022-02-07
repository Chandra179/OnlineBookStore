import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AppBar from "../components/AppBar";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import BooksByGenre from '../pages/BooksByGenre';
import BookDetail from "../pages/BookDetail";
import Home from "../pages/Home";
import Cart from "../pages/Cart";

const Routes = () => {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:genre/:page" component={BooksByGenre} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/:genre/:page/:title" component={BookDetail} />
        <ProtectedRoute path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
}

export default Routes;