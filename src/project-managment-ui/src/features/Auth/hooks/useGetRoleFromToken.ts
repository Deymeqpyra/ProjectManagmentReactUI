import { useState, useEffect } from 'react';
import AuthService from '../Service/AuthService';

export const useGetRoleFromToken = () => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      const { role: userRole } = AuthService.getUserRoleAndEmailFromToken() as {
        role: string;
      };
      console.log('Role in hook:', userRole); 
      setRole(userRole);
    }
    setIsLoading(false);
  }, []); 

  return { role, isLoading };
};

