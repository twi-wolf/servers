import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  Database, Plus, LayoutDashboard, Settings, Code2,
  MapPin, Server, Users, HardDrive, Package, X, CheckCircle
} from 'lucide-react'

const mockDbs = [
  { id: 1, name: 'db_wolf_main', host: 'localhost', port: 3306, type: 'mysql', user: 'wolfbot', server: 'WA Sales Bot', status: 'active' },
  { id: 2, name: 'db_wolf_staging', host: 'localhost', port: 5432, type: 'postgres', user: 'wolfstage', server: 'WA Support Bot', status: 'active' },
]

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

export default function AdminDatabases() {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <Layout pageTitle="Admin — Databases">
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
                <h1>Databases <span className="admin-header-sub">All database hosts available to servers.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Databases</div>
              </div>
              <button className="admin-create-btn" onClick={() => setShowCreate(true)}>
                <Plus size={15} /> New Database Host
              </button>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Host</th><th>Port</th><th>Type</th><th>User</th><th>Server</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  {mockDbs.map(db => (
                    <tr key={db.id}>
                      <td className="cell-name">{db.name}</td>
                      <td><code>{db.host}</code></td>
                      <td><code>{db.port}</code></td>
                      <td><span className={`admin-badge ${db.type === 'mysql' ? 'orange' : 'blue'}`}>{db.type}</span></td>
                      <td><code>{db.user}</code></td>
                      <td className="cell-muted">{db.server}</td>
                      <td><span className="admin-badge green"><CheckCircle size={11} /> {db.status}</span></td>
                      <td>
                        <div className="row-actions">
                          <button className="row-action-btn danger" title="Delete"><X size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showCreate && (
              <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                <div className="admin-modal" onClick={e => e.stopPropagation()}>
                  <div className="admin-modal-header">
                    <h3>New Database Host</h3>
                    <button onClick={() => setShowCreate(false)}><X size={18} /></button>
                  </div>
                  {[
                    { label: 'Name', placeholder: 'db_wolf_main' },
                    { label: 'Host', placeholder: 'localhost' },
                    { label: 'Port', placeholder: '3306' },
                    { label: 'Username', placeholder: 'wolfbot' },
                    { label: 'Password', placeholder: '••••••••' },
                  ].map(f => (
                    <div className="admin-form-group" key={f.label}>
                      <label>{f.label}</label>
                      <input type={f.label === 'Password' ? 'password' : 'text'} placeholder={f.placeholder} />
                    </div>
                  ))}
                  <div className="admin-modal-actions">
                    <button className="admin-modal-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
                    <button className="admin-modal-submit" onClick={() => setShowCreate(false)}>Create</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
