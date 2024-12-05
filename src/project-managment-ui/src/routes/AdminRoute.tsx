import React from 'react';
import { useGetRoleFromToken } from '../hooks/useGetRoleFromToken';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const role = useGetRoleFromToken();

  if (role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;