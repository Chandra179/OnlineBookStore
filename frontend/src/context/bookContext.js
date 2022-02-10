import React, { useState, createContext } from "react";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);

  return (
    <BookContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
