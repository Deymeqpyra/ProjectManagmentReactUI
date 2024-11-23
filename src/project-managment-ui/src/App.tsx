import { BrowserRouter as Router } from 'react-router-dom'
import BasicRouter from './routes/BasicRoute'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <BasicRouter />
    </Router>
  )
}

export default App
