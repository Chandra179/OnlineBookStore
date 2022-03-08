import React, { useState, createContext } from "react";
import AuthService from "../services/auth.service";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  var userEmail = AuthService.getCurrentUser();
  const [clientSecret, setClientSecret] = useState(localStorage.getItem(userEmail + 'Order'));

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
