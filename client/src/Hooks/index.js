import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AccountContext } from "../Context/account-context";
import { CartContext } from "../Context/cart-context";
import { getCurrentUser } from "../Utils/helpers";

export const useAccount = () => {
  const accounttx = useContext(AccountContext);
  return {
    ...accounttx,
  };
};

export const useCart = () => {
  const carttx = useContext(CartContext);
  return {
    ...carttx,
  };
};

export function useUpdateCart() {
  const userEmail = getCurrentUser();
  const [value, setValue] = useState(() => {
    const cartItems = localStorage.getItem(userEmail + "Cart");
    return cartItems !== null
      ? JSON.parse(localStorage.getItem(userEmail + "Cart"))
      : {};
  });
  useEffect(() => {
    localStorage.setItem(userEmail + "Cart", JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}