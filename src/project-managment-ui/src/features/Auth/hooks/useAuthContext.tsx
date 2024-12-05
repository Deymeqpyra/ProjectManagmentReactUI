import AuthContext from '../Components/AuthComponents/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
  const context = useContext(AuthContext) 
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuthContext;