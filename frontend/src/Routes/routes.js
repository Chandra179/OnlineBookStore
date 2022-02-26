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
import BooksByGenre from '../pages/BooksByGenre/Index';
import ProductDetail from "../pages/BookDetail/Index";
import Home from "../pages/Home/Index";
import Cart from "../pages/Cart/Index";
import Checkout from "../pages/Checkout/Index";

const Routes = () => {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/genres/:genre/:page" component={BooksByGenre} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/genres/:genre/:page/:title" component={ProductDetail} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/cart/checkout" component={Checkout} />
      </Switch>
    </Router>
  );
}

export default Routes;