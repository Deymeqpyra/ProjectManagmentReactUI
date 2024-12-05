import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../Service/AuthService'
import useAuth from '../../hooks/useAuthContext'

const RegisterProvider: React.FC = () => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()

  const handleLogin = async () => {
    const success = await AuthService.register(userName, email, password)
    if (success) {
      authLogin()
      navigate('/')
    } else {
      setError('Wrong crenditals.')
    }
  }

  return (
    <div className="register-page">
      <div className="form">
        <form
          className="register-form"
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
        >
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>UserName</label>
          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Sign up: </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p className="message">
             Have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterProvider
