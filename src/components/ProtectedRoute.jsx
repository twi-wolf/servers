import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#000', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'JetBrains Mono, monospace', color: '#00ff00', fontSize: '0.9rem',
        letterSpacing: '0.1em'
      }}>
        LOADING...
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return children
}
