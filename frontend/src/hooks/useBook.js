import React, { useContext } from 'react';
import { BookContext } from "../context/bookContext"

export const useBook = () => {
   
    const btx = useContext(BookContext)

    return {
        ...btx
    }
}