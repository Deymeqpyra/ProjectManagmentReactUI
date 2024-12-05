import { useState, useEffect } from 'react'
import AuthService from '../features/Auth/Service/AuthService'

export const useGetRoleFromToken = () => {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const token = AuthService.getToken()
    if (token) {
      const { role: userRole } = AuthService.getUserRoleAndEmailFromToken() as {
        email: string
        role: string
      }
      setRole(userRole)
    }
  }, [])

  return role
}
