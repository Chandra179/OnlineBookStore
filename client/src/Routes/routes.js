import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignIn from "../Pages/SignIn";
import Home from "../Pages/Home";
import Books from "../Pages/Books";
import BookDetails from "../Pages/BookDetails/BookDetails";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/genres/:genre/:page/:title" element={<BookDetails />} />
        <Route exact path="/genres/:genre/:page" element={<Books />} />
        <Route exact path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
