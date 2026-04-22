import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Servers from './pages/Servers'
import ServerDetail from './pages/ServerDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes (Dashboard) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/servers" element={<Servers />} />
        <Route path="/servers/:id" element={<ServerDetail />} />
        
        {/* 404 Catch-all */}
        <Route path="*" element={
          <div style={{ 
            color: '#fff', 
            padding: '100px', 
            textAlign: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            background: '#000',
            minHeight: '100vh'
          }}>
            <h1 style={{ color: '#00ff00', fontSize: '4rem', fontFamily: 'Orbitron, monospace' }}>404</h1>
            <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Page not found</p>
            <a href="/dashboard" style={{ color: '#00ff00', textDecoration: 'none' }}>Go to Dashboard →</a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App