import React from 'react';
import { getCurrentUser } from "../Utils/helpers";
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    
    const isAuthenticated = getCurrentUser();
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;