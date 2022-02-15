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
import ProductDetail from "../pages/ProductDetail/Index";
import Home from "../pages/Home";
import Cart from "../pages/Cart/Index";

const Routes = () => {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:genre/:page" component={BooksByGenre} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/:genre/:page/:title" component={ProductDetail} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
}

export default Routes;