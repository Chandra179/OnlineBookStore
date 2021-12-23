import React, { useContext } from 'react';
import { UserContext } from "../context/userContext"

export const useUser = () => {
   
    const utx = useContext(UserContext)

    return {
        ...utx
    }
}