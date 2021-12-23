import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from "../components/Navbar"
import Home from '../pages/Home'

const Routes = () => {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  );
}

export default Routes;