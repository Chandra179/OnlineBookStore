import React, { useState, createContext } from 'react';

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const [cartBadge, setCartBadge] = useState(0);

    return (
        <CartContext.Provider
            value={{
                cartBadge,
                setCartBadge
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
