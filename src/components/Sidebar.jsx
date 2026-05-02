import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/Sidebar.css'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, Server, Users, Code2, Settings,
  ChevronLeft, ChevronRight, LogOut, Shield, X,
  LayoutGrid, Database, MapPin, HardDrive, Package
} from 'lucide-react'

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
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

  const adminItems = [
    { path: '/admin', label: 'Admin Overview', icon: LayoutGrid },
    { path: '/admin/nodes', label: 'Nodes', icon: Server },
    { path: '/admin/locations', label: 'Locations', icon: MapPin },
    { path: '/admin/databases', label: 'Databases', icon: Database },
    { path: '/admin/mounts', label: 'Mounts', icon: HardDrive },
    { path: '/admin/nests', label: 'Nests', icon: Package },
  ]

  const isAdmin = user?.role === 'admin'

  const handleLogout = () => { logout(); navigate('/login') }
  const handleNavClick = () => setMobileOpen(false)

  const isActive = (path) =>
    path === '/admin'
      ? location.pathname === '/admin'
      : location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Mobile close */}
      <button className="sidebar-mobile-close" onClick={() => setMobileOpen(false)}>
        <X size={18} />
      </button>

      {/* Logo */}
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

      <nav className="sidebar-nav">
        {/* Main nav */}
        {!collapsed && <span className="sidebar-section-label">Main</span>}
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
              onClick={handleNavClick}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}

        {/* Admin section */}
        {isAdmin && (
          <>
            {!collapsed && <span className="sidebar-section-label admin-label">Administration</span>}
            {collapsed && <div className="sidebar-divider" />}
            {adminItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-link admin-link ${isActive(item.path) ? 'active' : ''}`}
                  title={collapsed ? item.label : ''}
                  onClick={handleNavClick}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      {/* Collapse toggle (desktop) */}
      <button className="sidebar-toggle desktop-only" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        {!collapsed && <span>Collapse</span>}
      </button>

      {/* User profile */}
      <div className="sidebar-user">
        <div className={`user-avatar ${isAdmin ? 'admin' : ''}`}>
          {isAdmin
            ? <Shield size={16} />
            : <span>{user?.username?.[0]?.toUpperCase() || 'U'}</span>
          }
        </div>
        {!collapsed && (
          <div className="user-info">
            <p className="user-name">
              {user?.username || 'User'}
              {isAdmin && <span className="user-role-badge">Admin</span>}
            </p>
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
