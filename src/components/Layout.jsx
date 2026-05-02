import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import '../styles/Layout.css'

export default function Layout({ children, pageTitle }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="layout">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className={`main-wrapper ${sidebarCollapsed ? 'expanded' : ''}`}>
        <Header
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          pageTitle={pageTitle}
          onHamburger={() => setMobileOpen(o => !o)}
        />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
