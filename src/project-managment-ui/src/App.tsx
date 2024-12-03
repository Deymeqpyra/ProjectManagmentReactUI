import { BrowserRouter as Router } from 'react-router-dom'
import BasicRouter from './routes/BasicRoute'
import './App.css'
import { AuthProvider } from './features/Auth/Components/AuthComponents/AuthContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <BasicRouter />
    </Router>
    </AuthProvider>
  )
}

export default App
