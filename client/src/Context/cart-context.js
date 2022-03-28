import React, { useState, createContext, useEffect } from "react";
import { getCurrentUser, getCheckoutItem, getCartItem, setCartItem } from "../Utils/helpers";

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
    setCartItem(userEmail, cart)
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cartBadge,
        setCartBadge,
        selectedCheckbox,
        setSelectedCheckbox,
        cart,
        setCart,
        cartItemKeys,
        isAllCheckboxSelected,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;