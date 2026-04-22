import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import '../styles/Layout.css'

export default function Layout({ children, pageTitle }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="layout">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className={`main-wrapper ${sidebarCollapsed ? 'expanded' : ''}`}>
        <Header 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
          pageTitle={pageTitle}
        />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}