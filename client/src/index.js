import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Routes/routes";
import "./index.css";

import CartContextProvider from "./Context/cart-context";
import AccountContextProvider from "./Context/account-context";

ReactDOM.render(
  <AccountContextProvider>
    <CartContextProvider>
      <Navigation />
    </CartContextProvider>
  </AccountContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
