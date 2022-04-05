import React, { useState, createContext, useEffect } from "react";
import { getCurrentUser } from "../Utils/helpers";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const userEmail = getCurrentUser();
  const [clientSecret, setClientSecret] = useState(
    localStorage.getItem(userEmail + "Order")
  );

  useEffect(() => {
    localStorage.setItem(userEmail + "Order", clientSecret);
  }, [clientSecret]);

  return (
    <OrderContext.Provider
      value={{
        clientSecret,
        setClientSecret,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
