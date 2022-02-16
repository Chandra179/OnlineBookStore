import { useContext } from 'react';
import { CheckoutContext } from '../context/checkoutContext';

export const useCheckout = () => {
   
    const ctx = useContext(CheckoutContext)

    return {
        ...ctx
    }
}