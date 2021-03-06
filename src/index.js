import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Routes/Routes";
import CartContextProvider from "./Context/cart-context";
import OrderContextProvider from "./Context/order-context";
import "./index.css";

ReactDOM.render(
  <CartContextProvider>
    <OrderContextProvider>
      <Navigation />
    </OrderContextProvider>
  </CartContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
