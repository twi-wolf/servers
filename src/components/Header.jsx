import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Bell, ChevronDown, LogOut, User, Settings, Search } from 'lucide-react'
import '../styles/Header.css'

export default function Header({ collapsed, setCollapsed, pageTitle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className={`header ${collapsed ? 'expanded' : ''}`}>
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={22} />
        </button>
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="header-right">
        {/* Search Bar */}
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>

        {/* Notifications */}
        <button className="header-icon">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        {/* User Dropdown */}
        <div className="user-dropdown">
          <button 
            className="user-menu"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="user-avatar-small">
              <span>U</span>
            </div>
            <span className="user-name-header">Username</span>
            <ChevronDown size={16} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">
                <User size={16} />
                Profile
              </Link>
              <Link to="/settings" className="dropdown-item">
                <Settings size={16} />
                Settings
              </Link>
              <hr className="dropdown-divider" />
              <button className="dropdown-item logout">
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