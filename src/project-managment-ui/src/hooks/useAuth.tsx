import AuthContext from '../features/Auth/Components/AuthComponents/AuthContext'
import { useContext } from 'react'

export const useAuth = () => {
  const context = useContext(AuthContext) //TODO:  useAuthContext // AUTH/hooks
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuth;