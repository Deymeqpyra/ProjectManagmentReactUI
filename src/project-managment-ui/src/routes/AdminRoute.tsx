import React from 'react'
import { useGetRoleFromToken } from '../features/Auth/hooks/useGetRoleFromToken'
import { Navigate } from 'react-router-dom'

interface AdminRouteProps {
  children: React.ReactNode
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { role, isLoading } = useGetRoleFromToken()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (role !== 'Admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AdminRoute

