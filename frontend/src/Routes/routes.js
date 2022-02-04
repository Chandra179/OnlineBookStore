import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//import ProtectedRoute from "./ProtectedRoute";
import AppBar from "../components/AppBar";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import BookList from '../pages/BookList';
import BookDetail from "../pages/BookDetail";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Tess from "../components/Tess";


const Routes = () => {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tess" component={Tess} />
        <Route path="/book" component={BookList} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/book/:title" component={BookDetail} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
}

export default Routes;