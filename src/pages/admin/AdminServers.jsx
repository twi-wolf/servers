import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  Server, LayoutDashboard, Settings, Code2, Database,
  MapPin, Users, HardDrive, Package, CheckCircle,
  XCircle, RefreshCw, Square, Play, ExternalLink
} from 'lucide-react'

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

export default function AdminServers() {
  const [servers, setServers] = useState([])

  useEffect(() => {
    fetch('/api/servers').then(r => r.ok ? r.json() : []).then(setServers).catch(() => setServers([]))
    const t = setInterval(() => {
      fetch('/api/servers').then(r => r.ok ? r.json() : []).then(setServers).catch(() => {})
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const action = (id, act) => fetch(`/api/servers/${id}/${act}`, { method: 'POST' }).catch(() => {})

  return (
    <Layout pageTitle="Admin — Servers">
      <div className="admin-page">
        <div className="admin-layout">
          <aside className="admin-sidenav">
            {adminNav.map(group => (
              <div key={group.label} className="admin-nav-group">
                <span className="admin-nav-group-label">{group.label}</span>
                {group.items.map(item => {
                  const Icon = item.icon
                  return (
                    <Link key={item.path} to={item.path} className={`admin-nav-link ${window.location.pathname === item.path ? 'active' : ''}`}>
                      <Icon size={15} /><span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            ))}
          </aside>

          <div className="admin-content">
            <div className="admin-content-header">
              <div>
                <h1>Servers <span className="admin-header-sub">All bot servers on this panel.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Servers</div>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr><th>#</th><th>Name</th><th>Node</th><th>Port</th><th>Status</th><th>Uptime</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {servers.map(s => (
                    <tr key={s.id}>
                      <td className="cell-muted">#{s.id}</td>
                      <td className="cell-name">{s.name}</td>
                      <td><code>{s.node}</code></td>
                      <td><code>{s.port}</code></td>
                      <td>
                        <span className={`admin-badge ${s.status === 'online' ? 'green' : s.status === 'starting' ? 'orange' : 'red'}`}>
                          {s.status === 'online' ? <CheckCircle size={11} /> : <XCircle size={11} />}
                          {s.status}
                        </span>
                      </td>
                      <td className="cell-muted">{s.uptime || '--'}</td>
                      <td>
                        <div className="row-actions">
                          {s.status === 'online' ? (
                            <>
                              <button className="row-action-btn" title="Restart" onClick={() => action(s.id, 'restart')}><RefreshCw size={14} /></button>
                              <button className="row-action-btn danger" title="Stop" onClick={() => action(s.id, 'stop')}><Square size={14} /></button>
                            </>
                          ) : (
                            <button className="row-action-btn success" title="Start" onClick={() => action(s.id, 'start')}><Play size={14} /></button>
                          )}
                          <Link to={`/servers/${s.id}`} className="row-action-btn" title="Manage"><ExternalLink size={14} /></Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {servers.length === 0 && (
                    <tr><td colSpan={7} className="empty-cell">No servers found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
