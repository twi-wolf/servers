import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  MapPin, Plus, LayoutDashboard, Settings, Code2,
  Database, Server, Users, HardDrive, Package, X
} from 'lucide-react'

const mockLocations = [
  { id: 1, short: 'NBO', long: 'Nairobi, Kenya', nodes: 2, servers: 3 },
  { id: 2, short: 'JNB', long: 'Johannesburg, ZA', nodes: 1, servers: 0 },
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

export default function AdminLocations() {
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ short: '', long: '' })

  return (
    <Layout pageTitle="Admin — Locations">
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
                <h1>Locations <span className="admin-header-sub">Physical locations where your nodes are deployed.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Locations</div>
              </div>
              <button className="admin-create-btn" onClick={() => setShowCreate(true)}>
                <Plus size={15} /> Add Location
              </button>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr><th>Short Code</th><th>Long Name</th><th>Nodes</th><th>Servers</th><th></th></tr>
                </thead>
                <tbody>
                  {mockLocations.map(loc => (
                    <tr key={loc.id}>
                      <td><code>{loc.short}</code></td>
                      <td className="cell-name"><MapPin size={13} /> {loc.long}</td>
                      <td>{loc.nodes}</td>
                      <td>{loc.servers}</td>
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
                    <h3>Add Location</h3>
                    <button onClick={() => setShowCreate(false)}><X size={18} /></button>
                  </div>
                  <div className="admin-form-group">
                    <label>Short Code</label>
                    <input type="text" placeholder="NBO" maxLength={5}
                      value={form.short} onChange={e => setForm({ ...form, short: e.target.value })} />
                  </div>
                  <div className="admin-form-group">
                    <label>Location Name</label>
                    <input type="text" placeholder="Nairobi, Kenya"
                      value={form.long} onChange={e => setForm({ ...form, long: e.target.value })} />
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
