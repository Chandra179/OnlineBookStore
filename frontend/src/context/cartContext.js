import React, { useState, createContext } from 'react';

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const [cartLength, setCartLength] = useState(0);

    return (
        <CartContext.Provider
            value={{
                cartLength,
                setCartLength
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
