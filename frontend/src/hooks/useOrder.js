import { useContext } from 'react';
import { OrderContext } from '../context/orderContext';

export const useOrder = () => {

    const otx = useContext(OrderContext)
    
    return {
        ...otx
    }
}