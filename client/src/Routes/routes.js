import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signin from "../Pages/Auth/Signin";
import Signup from "../Pages/Auth/Signup";
import Home from "../Pages/Home";
import Books from "../Pages/Books";
import Navbar from "../Layouts/NavBar";

const Navigation = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/genres/:genre/:page" element={<Books />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
