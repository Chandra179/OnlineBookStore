import React, { useState, createContext, useReducer } from 'react';

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
    const [cartItem, setCartItem] = useState(['chandra'])
    return ( 
        <CartContext.Provider value={{cartItem}} >
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;
