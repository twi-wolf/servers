import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

const DEMO_USERS = [
  { id: 1, username: 'admin', email: 'admin@serverwolf.io', password: 'admin123', role: 'admin' },
  { id: 2, username: 'wolfuser', email: 'user@serverwolf.io', password: 'user123', role: 'user' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('sw_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('sw_user') }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Invalid email or password.' }
    const { password: _p, ...safe } = found
    setUser(safe)
    localStorage.setItem('sw_user', JSON.stringify(safe))
    return { success: true }
  }

  const register = (username, email, password) => {
    const exists = DEMO_USERS.find(u => u.email === email)
    if (exists) return { success: false, error: 'An account with this email already exists.' }
    const newUser = { id: Date.now(), username, email, role: 'user' }
    setUser(newUser)
    localStorage.setItem('sw_user', JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sw_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
