import { useContext } from "react";
import { CartContext } from "../Context/cart-context";
import { OrderContext } from "../Context/order-context";

export const useCart = () => {
  const carttx = useContext(CartContext);
  return {
    ...carttx,
  };
};

export const useOrder = () => {
  const otx = useContext(OrderContext);
  return {
    ...otx,
  };
};