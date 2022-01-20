import React, { useState, createContext } from 'react';

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
    const userEmail = JSON.parse(localStorage.getItem('user'))['email'];
    const [cartItem, setCartItem] = useState(
        localStorage.getItem(userEmail)
    );

    return ( 
        <CartContext.Provider value={{cartItem, setCartItem}} >
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;
