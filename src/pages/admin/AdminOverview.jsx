import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  LayoutDashboard, Settings, Code2, Database, MapPin,
  Server, Users, HardDrive, Package, Activity,
  Cpu, MemoryStick, Globe, ExternalLink, CheckCircle,
  AlertTriangle, Zap
} from 'lucide-react'

const VERSION = 'v1.0.0-canary'

export default function AdminOverview() {
  const [stats, setStats] = useState({ servers: 0, online: 0, users: 0 })

  useEffect(() => {
    fetch('/api/servers').then(r => r.ok ? r.json() : []).then(data => {
      setStats({
        servers: data.length,
        online: data.filter(s => s.status === 'online').length,
        users: 5,
      })
    }).catch(() => {})
  }, [])

  const adminNav = [
    { label: 'BASIC ADMINISTRATION', items: [
      { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
      { path: '/admin/settings', icon: Settings, label: 'Settings' },
      { path: '/admin/api', icon: Code2, label: 'Application API' },
    ]},
    { label: 'MANAGEMENT', items: [
      { path: '/admin/databases', icon: Database, label: 'Databases' },
      { path: '/admin/locations', icon: MapPin, label: 'Locations' },
      { path: '/admin/nodes', icon: Server, label: 'Nodes' },
      { path: '/admin/servers', icon: Server, label: 'Servers' },
      { path: '/admin/users', icon: Users, label: 'Users' },
    ]},
    { label: 'SERVICE MANAGEMENT', items: [
      { path: '/admin/mounts', icon: HardDrive, label: 'Mounts' },
      { path: '/admin/nests', icon: Package, label: 'Nests' },
    ]},
  ]

  return (
    <Layout pageTitle="Admin">
      <div className="admin-page">
        <div className="admin-layout">
          {/* Left nav */}
          <aside className="admin-sidenav">
            {adminNav.map(group => (
              <div key={group.label} className="admin-nav-group">
                <span className="admin-nav-group-label">{group.label}</span>
                {group.items.map(item => {
                  const Icon = item.icon
                  const active = window.location.pathname === item.path
                  return (
                    <Link key={item.path} to={item.path} className={`admin-nav-link ${active ? 'active' : ''}`}>
                      <Icon size={15} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            ))}
          </aside>

          {/* Main content */}
          <div className="admin-content">
            <div className="admin-content-header">
              <div>
                <h1>Administrative Overview <span className="admin-header-sub">A quick glance at your system.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Index</div>
              </div>
            </div>

            {/* System Info */}
            <div className="admin-info-card">
              <div className="admin-info-header">
                <Activity size={16} />
                <span>System Information</span>
              </div>
              <div className="admin-info-body">
                <CheckCircle size={16} className="info-ok-icon" />
                <span>You are running SERVER-WOLF Panel version <code className="version-badge">{VERSION}</code>. Your panel is up-to-date!</span>
              </div>
            </div>

            {/* Quick action links */}
            <div className="admin-quick-links">
              <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="admin-quick-btn discord">
                <Zap size={16} /> Get Help (via Discord)
              </a>
              <a href="https://github.com/WOLFTECH-254/silentwolf" target="_blank" rel="noopener noreferrer" className="admin-quick-btn docs">
                <ExternalLink size={16} /> Documentation
              </a>
              <a href="https://github.com/WOLFTECH-254/silentwolf" target="_blank" rel="noopener noreferrer" className="admin-quick-btn github">
                <Globe size={16} /> GitHub
              </a>
              <a href="https://github.com/WOLFTECH-254/silentwolf" target="_blank" rel="noopener noreferrer" className="admin-quick-btn support">
                <CheckCircle size={16} /> Support the Project
              </a>
            </div>

            {/* Stats Grid */}
            <div className="admin-stats-grid">
              <div className="admin-stat-tile">
                <Server size={22} />
                <div>
                  <span className="ast-val">{stats.servers}</span>
                  <span className="ast-lbl">Total Servers</span>
                </div>
              </div>
              <div className="admin-stat-tile green">
                <Activity size={22} />
                <div>
                  <span className="ast-val">{stats.online}</span>
                  <span className="ast-lbl">Online</span>
                </div>
              </div>
              <div className="admin-stat-tile">
                <Users size={22} />
                <div>
                  <span className="ast-val">{stats.users}</span>
                  <span className="ast-lbl">Users</span>
                </div>
              </div>
              <div className="admin-stat-tile">
                <Cpu size={22} />
                <div>
                  <span className="ast-val">--</span>
                  <span className="ast-lbl">CPU Usage</span>
                </div>
              </div>
              <div className="admin-stat-tile">
                <MemoryStick size={22} />
                <div>
                  <span className="ast-val">--</span>
                  <span className="ast-lbl">Memory</span>
                </div>
              </div>
            </div>

            {/* Wingx Daemon Info */}
            <div className="admin-info-card" style={{ marginTop: '1.5rem' }}>
              <div className="admin-info-header">
                <Server size={16} />
                <span>Wingx Daemon</span>
              </div>
              <div className="admin-daemon-info">
                <div className="daemon-row">
                  <span className="daemon-label">Daemon Port</span>
                  <code>3001</code>
                </div>
                <div className="daemon-row">
                  <span className="daemon-label">Bot Directory</span>
                  <code>server/bots/</code>
                </div>
                <div className="daemon-row">
                  <span className="daemon-label">Protocol</span>
                  <code>HTTP + Socket.io</code>
                </div>
                <div className="daemon-row">
                  <span className="daemon-label">Status</span>
                  <span className="daemon-status-ok"><CheckCircle size={13} /> Running</span>
                </div>
                <p className="daemon-hint">
                  During VPS deployment, install the Wingx daemon and point it to its own domain/subdomain (e.g. <code>daemon.yourdomain.com:3001</code>). Update the proxy target in your reverse proxy config to match.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
