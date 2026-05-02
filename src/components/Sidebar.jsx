import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/Sidebar.css'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  Server,
  Users,
  Code2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield
} from 'lucide-react'

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/servers', label: 'Servers', icon: Server },
    { path: '/users', label: 'Users', icon: Users },
    { path: '/api', label: 'Application API', icon: Code2 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        {!collapsed && (
          <div className="logo-text">
            <span className="logo-wolf">SERVER-</span>
            <span className="logo-server">WOLF</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        {!collapsed && <span>Collapse</span>}
      </button>

      {/* User Profile (Bottom) */}
      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.role === 'admin'
            ? <Shield size={16} style={{ color: '#3b82f6' }} />
            : <span>{user?.username?.[0]?.toUpperCase() || 'U'}</span>
          }
        </div>
        {!collapsed && (
          <div className="user-info">
            <p className="user-name">{user?.username || 'User'}</p>
            <p className="user-email">{user?.email || ''}</p>
          </div>
        )}
        {!collapsed && (
          <button className="logout-btn" title="Logout" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  )
}
