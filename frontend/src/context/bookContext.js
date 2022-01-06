import React, { useState, createContext, useReducer } from 'react';

export const BookContext = createContext()

const BookContextProvider = ({children}) => {
    const [bookItem, setBookItem] = useState([]);

    return ( 
        <BookContext.Provider value={{bookItem, setBookItem}} >
            { children }
        </BookContext.Provider>
     );
}
 
export default BookContextProvider;
