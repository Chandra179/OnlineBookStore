import { useContext } from "react";
import { CartContext } from "../Context/cart-context";
import { AccountContext } from "../Context/account-context";

export const useCart = () => {
  const cartx = useContext(CartContext);
  return {
    ...cartx,
  };
};

export const useAccount = () => {
  const accounttx = useContext(AccountContext);
  return {
    ...accounttx,
  };
};
