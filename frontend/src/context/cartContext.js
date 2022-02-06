import React, { useState, createContext } from 'react';
import AuthService from "../services/auth.service";

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const userEmail = AuthService.getCurrentUser();
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem(userEmail)));
    const [cartLength, setCartLength] = useState(0);

    return (
        <CartContext.Provider
            value={{
                cartItem,
                setCartItem,
                cartLength,
                setCartLength
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
