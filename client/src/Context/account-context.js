import React, { useState, createContext } from "react";
import { getCurrentUser } from "../Utils/helpers";

export const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
  const userEmail = getCurrentUser();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAppbarDisabled, setIsAppbarDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState(
    localStorage.getItem(userEmail + "Order")
  );

  return (
    <AccountContext.Provider
      value={{
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
