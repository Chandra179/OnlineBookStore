import React, { useState, createContext, useEffect } from "react";
import {
  getCurrentUser,
  getCheckoutItem,
  getCartItem,
  setCartItem,
  setCheckoutItem,
} from "../Utils/helpers";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const userEmail = getCurrentUser();
  const [cart, setCart] = useState(getCartItem(userEmail));
  const [cartBadge, setCartBadge] = useState(0);
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    getCheckoutItem(userEmail)
  );
  const cartItemKeys = cart ? Object.keys(cart) : 0;
  const isAllCheckboxSelected =
    cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length;

  useEffect(() => {
    if (userEmail) {
      setCartItem(userEmail, cart);
    }
  }, [cart, userEmail]);

  useEffect(() => {
    if (userEmail) {
      setCheckoutItem(userEmail, selectedCheckbox);
    }
  }, [selectedCheckbox, userEmail]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartBadge,
        setCartBadge,
        selectedCheckbox,
        setSelectedCheckbox,
        cartItemKeys,
        isAllCheckboxSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
