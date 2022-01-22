import React, { useState, createContext } from 'react';

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [userState, setUserState] = useState(undefined);
    return ( 
        <UserContext.Provider value={{userState, setUserState}} >
            { children }
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;
