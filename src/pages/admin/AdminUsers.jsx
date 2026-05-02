import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  Users, Plus, Shield, User, Trash2, Edit, Key,
  LayoutDashboard, Settings, Code2, Database,
  MapPin, Server, HardDrive, Package, CheckCircle,
  XCircle, Search, X, Mail
} from 'lucide-react'

const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@serverwolf.io', role: 'admin', status: 'active', servers: 3, joined: 'Jan 15, 2026' },
  { id: 2, username: 'wolfuser', email: 'user@serverwolf.io', role: 'user', status: 'active', servers: 2, joined: 'Feb 3, 2026' },
  { id: 3, username: 'botmaster', email: 'botmaster@gmail.com', role: 'user', status: 'active', servers: 5, joined: 'Mar 10, 2026' },
  { id: 4, username: 'wabot_dev', email: 'dev@wabot.io', role: 'user', status: 'suspended', servers: 0, joined: 'Apr 1, 2026' },
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

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' })

  const filtered = mockUsers.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout pageTitle="Admin — Users">
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
                <h1>Users <span className="admin-header-sub">Manage all panel users.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Users</div>
              </div>
              <button className="admin-create-btn" onClick={() => setShowCreate(true)}>
                <Plus size={15} /> New User
              </button>
            </div>

            <div className="admin-toolbar">
              <div className="admin-search">
                <Search size={15} />
                <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-table">
                <thead>
                  <tr><th>User</th><th>Role</th><th>Status</th><th>Servers</th><th>Joined</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div className="admin-user-cell">
                          <div className="admin-avatar">{u.username[0].toUpperCase()}</div>
                          <div>
                            <div className="cell-name">{u.username}</div>
                            <div className="cell-muted">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`admin-badge ${u.role === 'admin' ? 'blue' : 'gray'}`}>
                          {u.role === 'admin' ? <Shield size={11} /> : <User size={11} />}
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge ${u.status === 'active' ? 'green' : 'red'}`}>
                          {u.status === 'active' ? <CheckCircle size={11} /> : <XCircle size={11} />}
                          {u.status}
                        </span>
                      </td>
                      <td>{u.servers}</td>
                      <td className="cell-muted">{u.joined}</td>
                      <td>
                        <div className="row-actions">
                          <button className="row-action-btn" title="Edit"><Edit size={14} /></button>
                          <button className="row-action-btn" title="Reset Password"><Key size={14} /></button>
                          <button className="row-action-btn danger" title="Delete"><Trash2 size={14} /></button>
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
                    <h3>Create User</h3>
                    <button onClick={() => setShowCreate(false)}><X size={18} /></button>
                  </div>
                  <div className="admin-form-group">
                    <label>Username</label>
                    <input placeholder="wolfuser" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                  </div>
                  <div className="admin-form-group">
                    <label><Mail size={12} /> Email</label>
                    <input type="email" placeholder="user@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="admin-form-group">
                    <label><Key size={12} /> Password</label>
                    <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                  </div>
                  <div className="admin-form-group">
                    <label><Shield size={12} /> Role</label>
                    <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="admin-modal-actions">
                    <button className="admin-modal-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
                    <button className="admin-modal-submit" onClick={() => setShowCreate(false)}>Create User</button>
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
