import { Routes, Route } from 'react-router-dom'
import LoginProvider from '../features/Auth/Components/AuthComponents/LoginProvider'
import ProtectedRoute from './ProtectedRoute'
import PageNotFound from '../components/PageNotFound'
import Layout from '../components/layout/Layout'
import HomePage from '../features/Home/HomePage'
import TableContainer from '../features/Category/TableContainer'
import RegisterProvider from '../features/Auth/Components/AuthComponents/RegisterProvider'
import ProjectContainer from '../features/Projects/ProjectContainer'
import TaskContainer from '../features/Tasks/TaskContainer'

const BasicRoute = () => {
  return (
    <div>
        <Routes>
          <Route path="/login" element={<LoginProvider />} />
          <Route path="/register" element={<RegisterProvider />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <TableContainer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <ProjectContainer />
                </ProtectedRoute>
              }
            />
            <Route
               path="/tasks/:projectId"
              element={
                <ProtectedRoute>
                  <TaskContainer />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
    </div>
  )
}

export default BasicRoute
