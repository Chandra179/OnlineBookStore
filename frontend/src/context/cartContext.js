import React, { useState, createContext } from 'react';
import AuthService from '../services/auth.service';

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
    const userEmail = AuthService.getCurrentUser();
    const [cartItem, setCartItem] = useState(
        JSON.parse(localStorage.getItem(userEmail))
    );

    return ( 
        <CartContext.Provider value={{userEmail, cartItem, setCartItem}} >
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;
