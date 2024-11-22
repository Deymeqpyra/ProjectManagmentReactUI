import React, { useEffect, useState } from 'react'
import authService from '../../Service/AuthService'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../Service/AuthService'

const WelcomePage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    AuthService.logout()
    navigate('/login')
  }
  useEffect(() => {
    const decodedEmail = authService.getEmailFromToken()
    setUserEmail(decodedEmail)
  }, [])

  return (
    <div>
      {userEmail ? <>Hello, {userEmail}!</> : <>Hello, Guest!</>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default WelcomePage
