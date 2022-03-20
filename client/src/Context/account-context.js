import React, { useState, createContext } from "react";

export const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
  const [cartBadge, setCartBadge] = useState(0);
  const [isAppbarDisabled, setIsAppbarDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState([]);

  return (
    <AccountContext.Provider
      value={{
        cartBadge,
        setCartBadge,
        isAppbarDisabled,
        setIsAppbarDisabled,
        clientSecret,
        setClientSecret
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;
