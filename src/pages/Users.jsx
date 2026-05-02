import { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/Users.css'
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Shield,
  User,
  Trash2,
  Edit,
  Key,
  Mail,
  Calendar,
  Server,
  CheckCircle,
  XCircle,
  X
} from 'lucide-react'

const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@serverwolf.io', role: 'admin', status: 'active', servers: 3, joined: 'Jan 15, 2026', lastSeen: '2 minutes ago' },
  { id: 2, username: 'wolfuser', email: 'user@serverwolf.io', role: 'user', status: 'active', servers: 2, joined: 'Feb 3, 2026', lastSeen: '1 hour ago' },
  { id: 3, username: 'botmaster', email: 'botmaster@gmail.com', role: 'user', status: 'active', servers: 5, joined: 'Mar 10, 2026', lastSeen: '3 hours ago' },
  { id: 4, username: 'wabot_dev', email: 'dev@wabot.io', role: 'user', status: 'suspended', servers: 0, joined: 'Apr 1, 2026', lastSeen: '5 days ago' },
  { id: 5, username: 'teslabot', email: 'tesla@automation.io', role: 'user', status: 'active', servers: 1, joined: 'Apr 20, 2026', lastSeen: '30 minutes ago' },
]

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [showCreate, setShowCreate] = useState(false)
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'user' })
  const [openMenu, setOpenMenu] = useState(null)

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = filterRole === 'all' || u.role === filterRole
    return matchSearch && matchRole
  })

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
    suspended: mockUsers.filter(u => u.status === 'suspended').length,
  }

  return (
    <Layout pageTitle="Users">
      <div className="users-page">

        {/* Stats Row */}
        <div className="users-stats">
          <div className="ustat-card">
            <Users size={20} />
            <div>
              <span className="ustat-val">{stats.total}</span>
              <span className="ustat-lbl">Total Users</span>
            </div>
          </div>
          <div className="ustat-card active">
            <CheckCircle size={20} />
            <div>
              <span className="ustat-val">{stats.active}</span>
              <span className="ustat-lbl">Active</span>
            </div>
          </div>
          <div className="ustat-card admin">
            <Shield size={20} />
            <div>
              <span className="ustat-val">{stats.admins}</span>
              <span className="ustat-lbl">Admins</span>
            </div>
          </div>
          <div className="ustat-card suspended">
            <XCircle size={20} />
            <div>
              <span className="ustat-val">{stats.suspended}</span>
              <span className="ustat-lbl">Suspended</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="users-toolbar">
          <div className="users-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="users-filters">
            <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button className="btn-create-user" onClick={() => setShowCreate(true)}>
            <Plus size={16} />
            New User
          </button>
        </div>

        {/* Users Table */}
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Servers</th>
                <th>Joined</th>
                <th>Last Seen</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar-sm">
                        {u.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="user-name-cell">{u.username}</p>
                        <p className="user-email-cell">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${u.role}`}>
                      {u.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${u.status}`}>
                      <span className="dot"></span>
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div className="servers-cell">
                      <Server size={14} />
                      <span>{u.servers}</span>
                    </div>
                  </td>
                  <td className="muted-cell">
                    <Calendar size={13} />
                    {u.joined}
                  </td>
                  <td className="muted-cell">{u.lastSeen}</td>
                  <td>
                    <div className="row-actions">
                      <button className="row-action-btn" title="Edit"><Edit size={15} /></button>
                      <button className="row-action-btn" title="Reset Password"><Key size={15} /></button>
                      <button className="row-action-btn danger" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="users-empty">
              <Users size={40} />
              <p>No users found</p>
            </div>
          )}
        </div>

        {/* Create User Modal */}
        {showCreate && (
          <div className="modal-overlay" onClick={() => setShowCreate(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Create New User</h3>
                <button className="modal-close" onClick={() => setShowCreate(false)}><X size={18} /></button>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="wolfuser" value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
              </div>
              <div className="form-group">
                <label><Mail size={13} /> Email</label>
                <input type="email" placeholder="user@example.com" value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label><Key size={13} /> Password</label>
                <input type="password" placeholder="••••••••" value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
              </div>
              <div className="form-group">
                <label><Shield size={13} /> Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
                <button className="modal-submit" onClick={() => setShowCreate(false)}>Create User</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
