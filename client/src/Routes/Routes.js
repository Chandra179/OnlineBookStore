import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Signin from "../Pages/Auth/Signin";
import Signup from "../Pages/Auth/Signup";
import Home from "../Pages/Home";
import Books from "../Pages/Books";
import Navbar from "../Layouts/NavBar";
import BookDetails from "../Pages/BookDetails";
import Cart from "../Pages/Cart";

const Navigation = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/genres/:genre/:page" element={<Books />} />
        <Route
          exact
          path="/genres/:genre/:page/:title"
          element={<BookDetails />}
        />
        <Route exact path="/cart" element={<PrivateRoute />}>
          <Route exact path="/cart" element={<Cart />} />
        </Route>
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
