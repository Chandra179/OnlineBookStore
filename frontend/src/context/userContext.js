import React, { useState, createContext } from 'react';

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <UserContext.Provider
            value={{
                userLoggedIn,
                setUserLoggedIn
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
