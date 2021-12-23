import React, { useContext } from 'react';
import { CartContext } from "../context/cartContext"

export const useCart = () => {
   
    const ctx = useContext(CartContext)

    return {
        ...ctx
    }
}