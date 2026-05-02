import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Servers from './pages/Servers'
import ServerDetail from './pages/ServerDetail'
import Users from './pages/Users'
import ApplicationApi from './pages/ApplicationApi'
import Settings from './pages/Settings'
import AdminOverview from './pages/admin/AdminOverview'
import AdminNodes from './pages/admin/AdminNodes'
import AdminLocations from './pages/admin/AdminLocations'
import AdminDatabases from './pages/admin/AdminDatabases'
import AdminServers from './pages/admin/AdminServers'
import AdminUsers from './pages/admin/AdminUsers'
import AdminMounts from './pages/admin/AdminMounts'
import AdminNests from './pages/admin/AdminNests'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected (all logged-in users) */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/servers" element={<ProtectedRoute><Servers /></ProtectedRoute>} />
          <Route path="/servers/:id" element={<ProtectedRoute><ServerDetail /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/api" element={<ProtectedRoute><ApplicationApi /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Admin-only routes */}
          <Route path="/admin" element={<AdminRoute><AdminOverview /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
          <Route path="/admin/api" element={<AdminRoute><ApplicationApi /></AdminRoute>} />
          <Route path="/admin/databases" element={<AdminRoute><AdminDatabases /></AdminRoute>} />
          <Route path="/admin/locations" element={<AdminRoute><AdminLocations /></AdminRoute>} />
          <Route path="/admin/nodes" element={<AdminRoute><AdminNodes /></AdminRoute>} />
          <Route path="/admin/servers" element={<AdminRoute><AdminServers /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/mounts" element={<AdminRoute><AdminMounts /></AdminRoute>} />
          <Route path="/admin/nests" element={<AdminRoute><AdminNests /></AdminRoute>} />

          {/* Redirects */}
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
