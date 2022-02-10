import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
