import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import '../styles/Navbar.css'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden'
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-wolf">SERVER-</span>
              <span className="logo-server">WOLF</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="navbar-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#docs">Docs</a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="navbar-auth">
            <Link to="/login" className="btn-outline">Login</Link>
            <Link to="/register" className="btn-primary">Get Started</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={closeMobileMenu} 
      />

      {/* Mobile Menu - Slides from LEFT */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="mobile-logo" onClick={closeMobileMenu}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-wolf">SERVER-</span>
              <span className="logo-server">WOLF</span>
            </div>
          </Link>
          <button 
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-menu-links">
          <a href="#features" onClick={closeMobileMenu}>Features</a>
          <a href="#pricing" onClick={closeMobileMenu}>Pricing</a>
          <a href="#about" onClick={closeMobileMenu}>About</a>
          <a href="#docs" onClick={closeMobileMenu}>Docs</a>
        </div>

        <div className="mobile-menu-auth">
          <Link to="/login" className="btn-outline mobile-btn" onClick={closeMobileMenu}>Login</Link>
          <Link to="/register" className="btn-primary mobile-btn" onClick={closeMobileMenu}>Get Started</Link>
        </div>

        <div className="mobile-menu-footer">
          <p className="mobile-copyright">© 2026 SERVER-WOLF</p>
        </div>
      </div>
    </>
  )
}