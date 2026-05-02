import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Servers from './pages/Servers'
import ServerDetail from './pages/ServerDetail'
import Users from './pages/Users'
import ApplicationApi from './pages/ApplicationApi'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/servers" element={<ProtectedRoute><Servers /></ProtectedRoute>} />
          <Route path="/servers/:id" element={<ProtectedRoute><ServerDetail /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/api" element={<ProtectedRoute><ApplicationApi /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Redirects for old routes */}
          <Route path="/billing" element={<Navigate to="/dashboard" replace />} />
          <Route path="/wallet" element={<Navigate to="/dashboard" replace />} />
          <Route path="/referrals" element={<Navigate to="/dashboard" replace />} />

          {/* 404 */}
          <Route path="*" element={
            <div style={{
              color: '#fff', padding: '100px', textAlign: 'center',
              fontFamily: 'JetBrains Mono, monospace', background: '#000', minHeight: '100vh'
            }}>
              <h1 style={{ color: '#00ff00', fontSize: '4rem', fontFamily: 'Orbitron, monospace' }}>404</h1>
              <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Page not found</p>
              <a href="/dashboard" style={{ color: '#00ff00', textDecoration: 'none' }}>Go to Dashboard →</a>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
