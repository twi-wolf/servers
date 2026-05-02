import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  HardDrive, Plus, LayoutDashboard, Settings, Code2,
  Database, MapPin, Server, Users, Package, X
} from 'lucide-react'

const mockMounts = [
  { id: 1, name: 'shared-assets', source: '/mnt/shared', target: '/home/container/shared', readOnly: true, servers: 2 },
  { id: 2, name: 'bot-plugins', source: '/mnt/plugins', target: '/home/container/plugins', readOnly: false, servers: 3 },
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

export default function AdminMounts() {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <Layout pageTitle="Admin — Mounts">
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
                <h1>Mounts <span className="admin-header-sub">Filesystem mounts shared across servers.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Mounts</div>
              </div>
              <button className="admin-create-btn" onClick={() => setShowCreate(true)}>
                <Plus size={15} /> New Mount
              </button>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Source</th><th>Target</th><th>Read Only</th><th>Servers</th><th></th></tr>
                </thead>
                <tbody>
                  {mockMounts.map(m => (
                    <tr key={m.id}>
                      <td className="cell-name">{m.name}</td>
                      <td><code>{m.source}</code></td>
                      <td><code>{m.target}</code></td>
                      <td><span className={`admin-badge ${m.readOnly ? 'orange' : 'green'}`}>{m.readOnly ? 'Yes' : 'No'}</span></td>
                      <td>{m.servers}</td>
                      <td>
                        <div className="row-actions">
                          <button className="row-action-btn danger"><X size={14} /></button>
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
                    <h3>New Mount</h3>
                    <button onClick={() => setShowCreate(false)}><X size={18} /></button>
                  </div>
                  {['Name', 'Source Path', 'Target Path'].map(label => (
                    <div className="admin-form-group" key={label}>
                      <label>{label}</label>
                      <input placeholder={label === 'Name' ? 'shared-assets' : '/mnt/path'} />
                    </div>
                  ))}
                  <div className="admin-form-group">
                    <label>Read Only</label>
                    <select><option value="false">No</option><option value="true">Yes</option></select>
                  </div>
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
