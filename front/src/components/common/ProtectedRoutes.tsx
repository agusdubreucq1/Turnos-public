import React from 'react';
import { useAppSelector } from '../hooks/store';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoutes