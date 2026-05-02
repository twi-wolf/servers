import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../styles/admin/Admin.css'
import {
  Package, Plus, LayoutDashboard, Settings, Code2,
  Database, MapPin, Server, Users, HardDrive, X, Edit
} from 'lucide-react'

const mockNests = [
  { id: 1, name: 'WhatsApp Bots', desc: 'WhatsApp automation bots using Baileys/WA-Web', eggs: 3, servers: 3, author: 'WOLFTECH' },
  { id: 2, name: 'Node.js Apps', desc: 'Generic Node.js application eggs', eggs: 2, servers: 0, author: 'WOLFTECH' },
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

export default function AdminNests() {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <Layout pageTitle="Admin — Nests">
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
                <h1>Nests <span className="admin-header-sub">Service eggs grouped into nests.</span></h1>
                <div className="admin-breadcrumb">Admin &rsaquo; Nests</div>
              </div>
              <button className="admin-create-btn" onClick={() => setShowCreate(true)}>
                <Plus size={15} /> New Nest
              </button>
            </div>

            <div className="admin-nests-grid">
              {mockNests.map(nest => (
                <div key={nest.id} className="admin-nest-card">
                  <div className="nest-card-header">
                    <Package size={20} />
                    <div>
                      <div className="cell-name">{nest.name}</div>
                      <div className="cell-muted">by {nest.author}</div>
                    </div>
                    <button className="row-action-btn" style={{ marginLeft: 'auto' }}><Edit size={14} /></button>
                  </div>
                  <p className="nest-desc">{nest.desc}</p>
                  <div className="nest-stats">
                    <span><Package size={12} /> {nest.eggs} eggs</span>
                    <span><Server size={12} /> {nest.servers} servers</span>
                  </div>
                </div>
              ))}
            </div>

            {showCreate && (
              <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                <div className="admin-modal" onClick={e => e.stopPropagation()}>
                  <div className="admin-modal-header">
                    <h3>New Nest</h3>
                    <button onClick={() => setShowCreate(false)}><X size={18} /></button>
                  </div>
                  <div className="admin-form-group">
                    <label>Nest Name</label>
                    <input placeholder="WhatsApp Bots" />
                  </div>
                  <div className="admin-form-group">
                    <label>Description</label>
                    <textarea placeholder="What type of services does this nest contain?" rows={3} />
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
