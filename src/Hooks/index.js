import { useContext } from "react";
import { CartContext } from "../Context/cart-context";

export const useCart = () => {
  const carttx = useContext(CartContext);
  return {
    ...carttx,
  };
};