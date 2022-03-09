import React, { useState, createContext } from "react";
import AuthService from "../services/auth.service";
import CartHelper from "../helper/cart.helper";
import CheckoutHelper from "../helper/checkout.helper";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const userEmail = AuthService.getCurrentUser();
  const [cartBadge, setCartBadge] = useState(0);

  var checkoutItem = CheckoutHelper.getCheckoutItem(userEmail);
  const [selectedCheckbox, setSelectedCheckbox] = useState(checkoutItem);

  var itemsInCart = CartHelper.getCartItem(userEmail);
  const [cartItem, setCartItem] = useState(itemsInCart);
  
  const cartItemKeys = cartItem ? Object.keys(cartItem) : 0;
  const isAllCheckboxSelected =
    cartItemKeys.length > 0 && selectedCheckbox.length === cartItemKeys.length;

  return (
    <CartContext.Provider
      value={{
        cartBadge,
        setCartBadge,
        selectedCheckbox,
        setSelectedCheckbox,
        cartItem,
        setCartItem,
        cartItemKeys,
        isAllCheckboxSelected
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
