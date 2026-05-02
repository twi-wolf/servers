import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  Server, Plus, LayoutDashboard, Settings, Code2, Database,
  MapPin, Users, HardDrive, Package, Activity,
  CheckCircle, XCircle, Cpu, MemoryStick, Globe, X
} from 'lucide-react'

const mockNodes = [
  { id: 1, name: 'Node-01', location: 'Nairobi, KE', fqdn: 'node1.serverwolf.io', memory: 8192, disk: 102400, memUsed: 1420, diskUsed: 12800, servers: 3, status: 'online', daemon: 'v1.0.0' },
  { id: 2, name: 'Node-02', location: 'Nairobi, KE', fqdn: 'node2.serverwolf.io', memory: 16384, disk: 204800, memUsed: 0, diskUsed: 0, servers: 0, status: 'offline', daemon: '--' },
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

export default function AdminNodes() {
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ name: '', location: 'Nairobi, KE', fqdn: '', memory: '', disk: '' })

  return (
    <Layout pageTitle="Admin — Nodes">
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
                <h1>Nodes <span className="admin-header-sub">All daemon nodes registered to this panel.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Nodes</div>
              </div>
              <button className="admin-create-btn" onClick={() => setShowCreate(true)}>
                <Plus size={15} /> Create Node
              </button>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>FQDN</th>
                    <th>Memory</th>
                    <th>Disk</th>
                    <th>Servers</th>
                    <th>Daemon</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockNodes.map(n => (
                    <tr key={n.id}>
                      <td className="cell-name">{n.name}</td>
                      <td className="cell-muted"><Globe size={12} /> {n.location}</td>
                      <td><code>{n.fqdn}</code></td>
                      <td>
                        <div className="res-bar-wrap">
                          <div className="res-bar"><div className="res-fill" style={{ width: `${(n.memUsed/n.memory)*100}%` }} /></div>
                          <span>{n.memUsed} / {n.memory} MB</span>
                        </div>
                      </td>
                      <td>
                        <div className="res-bar-wrap">
                          <div className="res-bar disk"><div className="res-fill disk" style={{ width: `${(n.diskUsed/n.disk)*100}%` }} /></div>
                          <span>{Math.round(n.diskUsed/1024)} / {Math.round(n.disk/1024)} GB</span>
                        </div>
                      </td>
                      <td><Server size={13} /> {n.servers}</td>
                      <td><code>{n.daemon}</code></td>
                      <td>
                        <span className={`admin-badge ${n.status === 'online' ? 'green' : 'red'}`}>
                          {n.status === 'online' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {n.status}
                        </span>
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
                    <h3>Create Node</h3>
                    <button onClick={() => setShowCreate(false)}><X size={18} /></button>
                  </div>
                  {[
                    { label: 'Node Name', key: 'name', placeholder: 'Node-01' },
                    { label: 'FQDN / IP', key: 'fqdn', placeholder: 'node1.example.com' },
                    { label: 'Memory (MB)', key: 'memory', placeholder: '8192' },
                    { label: 'Disk (MB)', key: 'disk', placeholder: '102400' },
                  ].map(f => (
                    <div className="admin-form-group" key={f.key}>
                      <label>{f.label}</label>
                      <input type="text" placeholder={f.placeholder}
                        value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                    </div>
                  ))}
                  <div className="admin-modal-actions">
                    <button className="admin-modal-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
                    <button className="admin-modal-submit" onClick={() => setShowCreate(false)}>Create Node</button>
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
