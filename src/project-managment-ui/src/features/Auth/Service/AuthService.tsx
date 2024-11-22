import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '../../../configs/HttpClient';

class AuthService {
  private static tokenKey = 'token';
  private static userKey = 'user';  
  private static httpClient = new HttpClient({ baseURL: 'http://localhost:5134/' });

  static async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await AuthService.httpClient.post<string>('/users/authenticate', {
        email,
        password,
      });

      const decodedToken: { userid: string; email: string; role: string } = jwtDecode(response);
      const user = {
        id: decodedToken.userid,
        email: decodedToken.email,
        role: decodedToken.role,
      };

      localStorage.setItem(AuthService.tokenKey, response);
      localStorage.setItem(AuthService.userKey, JSON.stringify(user)); 

      return true;
    } catch {
      return false;
    }
  }

  static logout(): void {
    localStorage.removeItem(AuthService.tokenKey);
    localStorage.removeItem(AuthService.userKey);
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem(AuthService.tokenKey);
  }

  static getToken(): string | null {
    return localStorage.getItem(AuthService.tokenKey);
  }

  static getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: { userid: string } = jwtDecode(token);
      return decodedToken.userid;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  static getUser(): { id: string; email: string; role: string } | null {
    const user = localStorage.getItem(AuthService.userKey);
    return user ? JSON.parse(user) : null;
  }
}

export default AuthService;
