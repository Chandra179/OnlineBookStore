import React, { useState, createContext } from "react";

export const CheckoutContext = createContext();

const CheckoutContextProvider = ({ children }) => {
  const [isAppbarDisabled, setIsAppbarDisabled] = useState(false);

  return (
    <CheckoutContext.Provider
      value={{
        isAppbarDisabled,
        setIsAppbarDisabled,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
