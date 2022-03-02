import React, { useState, createContext } from "react";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [clientSecret, setClientSecret] = useState("");

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
