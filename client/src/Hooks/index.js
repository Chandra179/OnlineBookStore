import { useContext } from "react";
import { AccountContext } from "../Context/account-context";
import { CartContext } from "../Context/cart-context";

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
