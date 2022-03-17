import React, { useState, createContext } from "react";
import { getCurrentUser } from "../Utils/helpers";

export const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
  const [cartBadge, setCartBadge] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAppbarDisabled, setIsAppbarDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState([]);

  return (
    <AccountContext.Provider
      value={{
        cartBadge,
        setCartBadge,
        isUserLoggedIn,
        setIsUserLoggedIn,
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
