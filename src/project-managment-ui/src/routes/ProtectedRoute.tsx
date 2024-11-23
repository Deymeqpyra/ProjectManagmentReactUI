import { FC, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setIsAuthenticated(false)
      navigate('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate])

  if (isAuthenticated === null) {
    return <p>Loading...</p>
  }

  return isAuthenticated ? <>{children}</> : null
}

export default ProtectedRoute
