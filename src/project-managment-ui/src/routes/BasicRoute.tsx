import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../features/Auth/Components/AuthComponents/AuthContext'
import LoginProvider from '../features/Auth/Components/AuthComponents/LoginProvider'
import WelcomePage from '../features/Auth/Components/WelcomePage/WelcomePage'
import ProtectedRoute from './ProtectedRoute'
import CategoryTable from '../features/Category/Components/TableCategories'

const BasicRoute = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginProvider />} />
          <Route
            path="/welcomePage"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
            <Route
            path="/TableCategories"
            element={
              <ProtectedRoute>
                <CategoryTable />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LoginProvider />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default BasicRoute
