import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import '../styles/Header.css'

export default function Header({ collapsed, setCollapsed, pageTitle, onHamburger }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className={`header ${collapsed ? 'expanded' : ''}`}>
      <div className="header-left">
        {/* Desktop collapse toggle */}
        <button
          className="menu-toggle desktop-only"
          onClick={() => setCollapsed(!collapsed)}
          title="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        {/* Mobile hamburger */}
        <button
          className="menu-toggle mobile-only"
          onClick={onHamburger}
          title="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="header-right">
        <button className="header-icon">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <div className="user-dropdown">
          <button
            className="user-menu"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="user-avatar-small">
              <span>{user?.username?.[0]?.toUpperCase() || 'U'}</span>
            </div>
            <span className="user-name-header">{user?.username || 'User'}</span>
            <ChevronDown size={16} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu" onClick={() => setDropdownOpen(false)}>
              <Link to="/settings" className="dropdown-item">
                <Settings size={16} />
                Settings
              </Link>
              <hr className="dropdown-divider" />
              <button className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
