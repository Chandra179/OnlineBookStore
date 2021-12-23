import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from "../components/Navbar";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from '../pages/Home';
import HomeDetail from "../pages/HomeDetail";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <Router>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home-detail" component={HomeDetail} />
        </Switch>
    </Router>
  );
}

export default Routes;