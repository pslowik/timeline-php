import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ path, element }) => {
    const { user } = useContext(AuthContext);

    return (
        user ? <Outlet/> : <Navigate to="/" state={{ from: path }} />
    );
};

export default ProtectedRoute;
