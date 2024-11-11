import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../features/Auth/Components/AuthComponents/AuthContext'
import LoginProvider from '../features/Auth/Components/AuthComponents/LoginProvider'
import WelcomePage from '../features/Auth/Components/WelcomePage/WelcomePage'

const BasicRoute = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginProvider />} />
          <Route path="/welcomePage" element={<WelcomePage />} />
          <Route path="/" element={<LoginProvider />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default BasicRoute
