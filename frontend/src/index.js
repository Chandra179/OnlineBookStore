import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes/routes";
import "./index.css";

import CartContextProvider from "./context/cartContext";
import UserContextProvider from "./context/userContext";
import CheckoutContextProvider from "./context/checkoutContext";
import OrderContextProvider from "./context/orderContext";

ReactDOM.render(
  <UserContextProvider>
    <CartContextProvider>
      <CheckoutContextProvider>
        <OrderContextProvider>
          <Routes />
        </OrderContextProvider>
      </CheckoutContextProvider>
    </CartContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
