import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../Service/AuthService'
import useAuth from '../../hooks/useAuthContext'
import './LoginProvider.css'
const LoginProvider: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()

  const handleLogin = async () => {
    const success = await AuthService.login(email, password)
    if (success) {
      authLogin()
      navigate('/')
    } else {
      setError('Wrong crenditals.')
    }
  }

  return (
    <div className="login-page">
      <div className="form">
        <form
          className="login-form"
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Sign in</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p className="message">
            Not have account? <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginProvider
