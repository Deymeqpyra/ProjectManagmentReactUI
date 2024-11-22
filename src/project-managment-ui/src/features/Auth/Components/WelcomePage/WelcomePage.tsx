import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Service/AuthService';

interface DecodedToken {
  email?: string;
} 


const WelcomePage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.email) {
          setUserEmail(decoded.email);
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  return (
    <div>
      {userEmail ? <>Hello, {userEmail}!</> : <>Hello, Guest!</>}
      <button onClick={handleLogout}>Logout</button>
    </div>
   );
};

export default WelcomePage;
