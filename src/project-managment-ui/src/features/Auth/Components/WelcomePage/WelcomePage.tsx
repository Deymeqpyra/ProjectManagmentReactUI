import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  email?: string;
}

const WelcomePage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
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
    </div>
  );
};

export default WelcomePage;
