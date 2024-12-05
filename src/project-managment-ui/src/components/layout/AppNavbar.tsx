import { Link, useNavigate } from 'react-router-dom'
import './AppNavbar.css'
import AuthService from '../../features/Auth/Service/AuthService'

const AppNavbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    AuthService.logout()
    navigate('/login')
  }

  const user = AuthService.getUserRoleAndEmailFromToken()

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user?.role === 'Admin' && (
          <li>
            <Link to="/categories">Category</Link>
          </li>
        )}
        {user?.role === 'Admin' && (
          <li>
            <Link to="/priorities">Priority</Link>
          </li>
        )}
         {user?.role === 'Admin' && (
          <li>
            <Link to="/statuses">Status</Link>
          </li>
        )}
        <li>
          <Link to="/projects">Projects</Link>
        </li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
      </ul>
    </nav>
  )
}

export default AppNavbar
