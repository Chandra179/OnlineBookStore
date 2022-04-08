import React, { useState, createContext, useEffect } from "react";
import {
  getCurrentUser,
  getPaymentId,
  getOrderItems,
  setPaymentId,
  setOrderItems,
} from "../Utils/helpers";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const userEmail = getCurrentUser();
  const [clientSecret, setClientSecret] = useState(getPaymentId(userEmail));
  const [order, setOrder] = useState(getOrderItems(userEmail));

  useEffect(() => {
    setPaymentId(userEmail, clientSecret);
  }, [clientSecret]);

  useEffect(() => {
    setOrderItems(userEmail, order);
  }, [order]);

  return (
    <OrderContext.Provider
      value={{
        clientSecret,
        setClientSecret,
        order,
        setOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
