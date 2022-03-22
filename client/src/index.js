import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Routes/Routes";
import "./index.css";

import AccountContextProvider from "./Context/account-context";

ReactDOM.render(
  <AccountContextProvider>
      <Navigation />
  </AccountContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
