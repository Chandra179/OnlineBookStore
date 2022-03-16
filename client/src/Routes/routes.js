import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BasicAppbar from "../Layouts/Appbar";
import SignIn from "../Pages/Access/SignIn";
import SignUp from "../Pages/Access/SignUp";

const Navigation = () => {
  return (
    <Router>
      <BasicAppbar />
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
