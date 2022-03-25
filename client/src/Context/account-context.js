import React, { useState, createContext } from "react";

export const AccountContext = createContext();

const AccountContextProvider = ({ children }) => {
  const [isAppbarDisabled, setIsAppbarDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState([]);

  return (
    <AccountContext.Provider
      value={{
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
