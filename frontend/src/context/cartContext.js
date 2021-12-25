import React, { useState, createContext, useReducer } from 'react';

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
    const [cartItem, setCartItem] = useState();

    return ( 
        <CartContext.Provider value={{cartItem, setCartItem}} >
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;
