import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/Navbar";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from '../pages/Home';
import HomeDetail from "../pages/HomeDetail";
import Cart from "../pages/Cart";


const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/book/:title" component={HomeDetail} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
}

export default Routes;