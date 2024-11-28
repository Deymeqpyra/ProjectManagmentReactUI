import { jwtDecode } from 'jwt-decode'
import { HttpClient } from '../../../configs/HttpClient'

class AuthService {
  private static tokenKey = 'token'
  private static httpClient = new HttpClient({
    baseURL: 'http://localhost:5134/',
  })

  static async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await AuthService.httpClient.post<string>(
        '/users/authenticate',
        {
          email,
          password,
        }
      )

      localStorage.setItem(AuthService.tokenKey, response)
      return true
    } catch {
      return false
    }
  }
  static async register(
    userName: string,
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const response = await AuthService.httpClient.post('/users/register', {
        email,
        userName,
        password,
      })

      const loginResponse = await AuthService.httpClient.post<string>(
        '/users/authenticate',
        {
          email,
          password,
        }
      )

      localStorage.setItem(AuthService.tokenKey, loginResponse)
      return true
    } catch {
      return false
    }
  }

  static logout(): void {
    localStorage.removeItem(AuthService.tokenKey)
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem(AuthService.tokenKey)
  }

  static getToken(): string | null {
    return localStorage.getItem(AuthService.tokenKey)
  }

  static getUserIdFromToken(): string | null {
    const token = this.getToken()
    if (!token) return null

    try {
      const decodedToken: { userid: string } = jwtDecode(token)
      return decodedToken.userid
    } catch (error) {
      console.error('Failed to decode token:', error)
      return null
    }
  }
  static getEmailFromToken(): string | null {
    const token = this.getToken()
    if (!token) return null

    try {
      const decodedToken: { email: string } = jwtDecode(token)
      return decodedToken.email
    } catch (error) {
      console.error('Failed to decode token', error)
      return null
    }
  }
  static getUserRoleAndEmailFromToken(): {
    email: string
    role: string
  } | null {
    const token = this.getToken()

    if (!token) return null

    try {
      const decodeToken: { email: string; role: string } = jwtDecode(token)
      return decodeToken
    } catch (error) {
      console.error('Failed to decode token', error)
      return null
    }
  }
}

export default AuthService
