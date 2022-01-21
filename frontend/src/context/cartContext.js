import React, { useState, createContext, useEffect } from 'react';
import AuthService from '../services/auth.service';
import  { Redirect } from 'react-router-dom';

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
    const [userEmail, setUserEmail] = useState("");
    const [cartItem, setCartItem] = useState(
        JSON.parse(localStorage.getItem(userEmail))
    );

    useEffect(() => {
        const userToken = localStorage.getItem('user');
        if (userToken === null) {
            <Redirect to='/signin' />
        } else {
            setUserEmail(JSON.parse(userToken)['email']);
        }
    }, []);

    return ( 
        <CartContext.Provider value={{cartItem, setCartItem}} >
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;
